import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MessagesService} from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no errors upon showErrors is called with undefined argument',
    fakeAsync(() => {
      let errorsEmitted;
      service.showErrors(undefined);
      service.errors$.subscribe(err => errorsEmitted = err);
      expect(errorsEmitted).toBeUndefined();
    }));

  it('should get the latest error that is passed to showErrors',
    (done) => {
      service.showErrors('Could not load robots');
      service.showErrors('Loaded robots size is not enough for composing a team of 5');
      service.errors$.subscribe(err => {
        expect(err).toEqual(['Loaded robots size is not enough for composing a team of 5']);
        done();
      });
    });

  it('should have no errors upon calling cleanErrors',
    fakeAsync(() => {
      let errorsEmitted;
      service.showErrors('Could not load robots');
      service.showErrors('Loaded robots size is not enough for composing a team of 5');
      service.cleanErrors();
      service.errors$.subscribe(err => errorsEmitted = err);
      tick(1000);
      expect(errorsEmitted).toBeUndefined();
    }));

});
