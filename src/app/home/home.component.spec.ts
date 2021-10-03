import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {Location} from '@angular/common';
import {HomeComponent} from './home.component';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {CompetitionComponent} from '@src/app/competition/competition.component';
import {CompetitionModule} from '@src/app/competition/competition.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [CompetitionModule, RouterTestingModule.withRoutes([{path: 'competition', component: CompetitionComponent}])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    // router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a header with the right content', () => {
    const header = fixture.debugElement.query(By.css('div.intro div.intro-text h1'));
    expect(header).toBeTruthy();
    expect(header.nativeElement.textContent).toContain('Imagine a world where all robots have only one goal - to win the Robo-Dance competition!');
  });

  it('should contain a button', () => {
    const button = fixture.debugElement.query(By.css('div.intro button'));
    expect(button).toBeTruthy();
  });

  it ('should go to url /competition', async(inject([Router, Location],
    (router: Router, location: Location) => {
    const button = fixture.debugElement.query(By.css('div.intro button'));
    button.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/competition');
    });
  })));

  // it('should call start method when clicking the button', () => {
  //   jest.spyOn(component, 'start');
  //   const button = fixture.debugElement.query(By.css('div.intro button'));
  //   button.nativeElement.click();
  //   fixture.whenStable().then(() => {
  //     expect(component.start).toHaveBeenCalled();
  //   });
  // });

  // it ('navigate to competition component after start execution', () => {
  //   const navigateSpy = jest.spyOn(router, 'navigateByUrl');
  //   component.start();
  //   expect(navigateSpy).toHaveBeenCalledWith('/competition');
  // });

});
