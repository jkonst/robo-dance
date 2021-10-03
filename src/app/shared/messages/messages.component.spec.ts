import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatIconModule} from '@angular/material/icon';
import {BehaviorSubject, of} from 'rxjs';
import {filter} from 'rxjs/operators';
import {By} from '@angular/platform-browser';
import {MessagesComponent} from './messages.component';
import {MessagesService} from './messages.service';

class MessagesServiceStub {
  errors$ = new BehaviorSubject<string[]>([]).asObservable().pipe(
    filter(messages => messages && messages.length > 0
      && messages.every(msg => !!msg))
  );
}

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let myMessagesService: MessagesService;
  beforeEach(async () => {
    await TestBed.overrideComponent(
      MessagesComponent,
      {set: {providers: [{provide: MessagesService, useClass: MessagesServiceStub}]}}
    );
    await TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [MatIconModule],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    myMessagesService = fixture.debugElement.injector.get(MessagesService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show messages container when there are no errors', () => {
    const messagesContainer = fixture.debugElement
      .query(By.css('.messages-container'));
    expect(messagesContainer).not.toBeTruthy();
  });

  it('should show messages container with mock errors', () => {
    myMessagesService.errors$ = of(['Could not load errors']);
    fixture.detectChanges();
    const messagesContainer = fixture.debugElement
      .query(By.css('.messages-container'));
    expect(messagesContainer).toBeTruthy();
  });

  it('should show the specific message error under a message class div', () => {
    myMessagesService.errors$ = of(['Could not load errors']);
    fixture.detectChanges();
    const messageDivs = fixture.debugElement
      .queryAll(By.css('.message'));
    expect(messageDivs.length).toBe(1);
    expect(messageDivs[0].nativeElement.textContent).toContain('Could not load errors');
  });

});
