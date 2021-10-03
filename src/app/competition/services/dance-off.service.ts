import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DanceOff, DanceOffPair} from '@src/app/competition/teams-dancefloor/model/danceoff';
import {getRandomInt} from '@src/app/shared/utils/helper';
import {StatusService} from '@src/app/services/status.service';
import {Status} from '@src/app/status';
import {TeamsService} from '@src/app/competition/services/teams.service';
import {catchError, concatMap, filter, map, mergeMap, retryWhen, take} from 'rxjs/operators';
import {MessagesService} from '@src/app/shared/messages/messages.service';
import {Robot} from '@src/app/shared/robot/model/robot';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';

@Injectable({
  providedIn: 'any'
})
export class DanceOffService {
  MAX_COMPETITION_DANCEOFFS = 5;

  private activePairSubject = new BehaviorSubject<number[]>([]);
  activePair$: Observable<number[]> = this.activePairSubject.asObservable();
  private danceOffsSubject = new BehaviorSubject<DanceOffPair[]>([]);
  danceOffs$: Observable<DanceOffPair[]> = this.danceOffsSubject.asObservable();


  constructor(private http: HttpClient,
              private statusService: StatusService,
              private teamsService: TeamsService,
              private leaderboardService: LeaderBoardService,
              private messagesService: MessagesService) {
  }

  init(competeAgain?: boolean): void {
    this.setActivePair([]);
    this.danceOffsSubject.next([]);
    if (!!competeAgain) {
      this.teamsService.initiateOpponents();
      this.statusService.setStatus(Status.DANCE_OFFS_PENDING);
    }
  }

  setActivePair(robotIDs: number[]): void {
    this.activePairSubject.next(robotIDs);
  }

  danceOff(): void {
    const opponents = [...this.activePairSubject.getValue()];
    this.teamsService.removeOpponents(opponents);
    const winner = this.pickRandomWinner(opponents);
    const danceOff: DanceOffPair = {
      opponents,
      winner
    };
    const danceOffs = [...this.danceOffsSubject.getValue(), danceOff];
    if (danceOffs.length === this.MAX_COMPETITION_DANCEOFFS) {
      this.postDanceOffs(danceOffs);
    }
    this.danceOffsSubject.next(danceOffs);
    this.setActivePair([]);
  }

  private postDanceOffs(danceoffs: DanceOffPair[]): void {
    this.statusService.setStatus(Status.PENDING_POSTING_DANCEOFFS);
    this.http.post('/parkside/api/danceoffs', {danceoffs}).pipe(
      map(response => response as any[]),
      map(doffs => doffs.length === danceoffs.length),
      filter(inserted => !!inserted),
      retryWhen(errors$ => errors$.pipe(
        mergeMap((error, i) =>
          i > 5 ? throwError('Max Retries Limit Error') : timer(500))
      )),
      catchError(err => {
        const message = 'Due to connectivity issues with the Server, ' +
          'last competition danceoffs are cancelled';
        return this.handleApiErrors(message, Status.ERROR_POSTING_DANCEOFFS, err);
      }),
      concatMap(_ => this.getPopulatedDanceOffs()),
      catchError(err => {
        const message = 'Due to connectivity issues with the Server, ' +
          'failed to get latest populated danceoffs';
        return this.handleApiErrors(message, Status.ERROR_GETTING_DANCEOFFS, err);
      })
    ).subscribe(robotsMap => {
      this.statusService.setStatus(Status.COMPETITION_COMPLETED);
      this.leaderboardService.setRobots([...robotsMap.values()]);
    });
  }

  private pickRandomWinner(activePair: number[]): number {
    const idx = getRandomInt(0, 1);
    return activePair[idx];
  }

  private getPopulatedDanceOffs(): Observable<Map<number, Robot>> {
    return this.http.get<DanceOff[]>('/parkside/api/danceoffs/populated').pipe(
      take(1),
      map(danceOffs => danceOffs.reduce((acc, cur) => {
        if (!!acc.get(cur.winner.id)) {
          acc.set(cur.winner.id, {
            ...acc.get(cur.winner.id),
            winsNo: acc.get(cur.winner.id).winsNo + 1
          });
        } else {
          acc.set(cur.winner.id, {...cur.winner, winsNo: 1});
        }
        return acc;
      }, new Map<number, Robot>())),
    );
  }

  private handleApiErrors(message: string, status: Status, error: any): Observable<never> {
    this.statusService.setStatus(status);
    this.messagesService.showErrors(message);
    return throwError(error);
  }
}
