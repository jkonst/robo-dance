import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MessagesService} from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showMessages = false;
  errors$: Observable<string[]>;

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit(): void {
    this.errors$ = this.messagesService.errors$.pipe(
      tap((errors) => console.log(errors)),
      tap(() => this.showMessages = true)
    );
  }

  onClose(): void {
    this.showMessages = false;
    this.messagesService.cleanErrors();
  }

}
