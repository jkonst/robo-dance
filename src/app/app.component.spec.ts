import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';
import {IsLeaderboardActivePipe} from '@src/app/pipes/is-leaderboard-active.pipe';
import {HeaderComponent} from '@src/app/header/header.component';
import {FooterComponent} from '@src/app/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        IsLeaderboardActivePipe
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('.wrapper'));
    expect(compiled).toBeTruthy();
  });
});
