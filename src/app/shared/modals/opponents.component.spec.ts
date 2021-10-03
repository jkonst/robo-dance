import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OpponentsComponent} from './opponents.component';
import {MatSelectModule} from '@angular/material/select';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: OpponentsComponent;
  let fixture: ComponentFixture<OpponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpponentsComponent],
      imports: [MatSelectModule, MatDialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title \'Opponents\'', () => {
    component.data = {title: 'Opponents', opponents: [{id: 1, name: 'Jack'}, {id: 2, name: 'John'}]};
    fixture.detectChanges();
    const header = fixture.debugElement
      .query(By.css('h1'));
    expect(header).toBeTruthy();
    expect(header.nativeElement.textContent).toContain('Opponents');
  });

});
