import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamsCreatorComponent} from './teams-creator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TeamsComposerComponent} from '@src/app/competition/teams-creator/teams-composer/teams-composer.component';
import {MatCardModule} from '@angular/material/card';

describe('TeamsCreatorComponent', () => {
  let component: TeamsCreatorComponent;
  let fixture: ComponentFixture<TeamsCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsCreatorComponent, TeamsComposerComponent ],
      imports: [ReactiveFormsModule, MatInputModule, MatCardModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
