import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanceOffStatusComponent } from './dance-off-status.component';

describe('DanceOffStatusComponent', () => {
  let component: DanceOffStatusComponent;
  let fixture: ComponentFixture<DanceOffStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanceOffStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanceOffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
