import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {By} from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect navigation items ul', () => {
    const ulElement = fixture.debugElement.
      query(By.css('mat-sidenav-container mat-sidenav-content mat-toolbar div ul.navigation-items'));
    expect(ulElement).toBeTruthy();
  });

  it('should find 2 list items', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul.navigation-items li'));
    expect(listItems.length).toBe(2);
  });

  it('should find Home list item', () => {
    const listItem = fixture.debugElement.queryAll(By.css('ul.navigation-items li'))[0].query(By.css('a span'));
    expect(listItem.nativeElement.textContent).toContain('Home');
  });

  it('should find Leaderboard list item', () => {
    const listItem = fixture.debugElement.queryAll(By.css('ul.navigation-items li'))[1].query(By.css('a span'));
    expect(listItem.nativeElement.textContent).toContain('Leaderboard');
  });


});
