import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Capsule } from './structs/transferStructs';
import { ButtonStateCapsule } from './structs/buttonStateCapsule';

@Injectable({
  providedIn: 'root'
})
export class QEmitterService {

  defaultButtonState? : ButtonStateCapsule = { target : '', disabled : false };
  defaultCapsule      : Capsule            = { ansTxt : [''], ansType : '' }
  defaultQmode?       : string            = '';

  private messageSource = new BehaviorSubject(this.defaultCapsule);
  currentMessage        = this.messageSource.asObservable();

  private BSubject   = new Subject<any>();
  private BState     = new Subject<any>();
  private QModeState = new Subject<any>();

  constructor() { 
  }

  //learn-mode components -> question.component
  sendQModeEvent(mode : string) {
    this.QModeState.next(mode);
  }

  getQModeEvent() : Observable<any> {
    return this.QModeState.asObservable();
  }

  //question.component -> answer components
  changeMessage(capsule: Capsule) : void {
    this.messageSource.next(capsule);
  }

  //question.component -> sequencer.component
  sendButtonState(capsule : ButtonStateCapsule) : void {
    this.BState.next(capsule);
  }

  //question.component -> sequencer.component
  getButtonStateEvent() : Observable<any> {
    return this.BState.asObservable();
  }

  //sequencer.component -> question.component
  sendClickEvent(buttonType : string) : void {
    this.BSubject.next(buttonType);
  }
  
  //sequencer.component -> question.component
  getClickEvent() : Observable<any> {
    return this.BSubject.asObservable();
  }
}