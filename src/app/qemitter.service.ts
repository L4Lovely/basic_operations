import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Capsule } from './structs/transferStructs';
import { ButtonStateCapsule } from './structs/buttonStateCapsule';

@Injectable({
  providedIn: 'root'
})
export class QEmitterService {

  defaultCapsule      : Capsule            = { ansTxt : [''], ansType : '' }
  defaultButtonState? : ButtonStateCapsule = { target : '', disabled : false };

  private messageSource = new BehaviorSubject(this.defaultCapsule);
  currentMessage        = this.messageSource.asObservable();

  private BSubject = new Subject<any>();
  private BState   = new Subject<any>();

  constructor() { 
  }

  changeMessage(capsule: Capsule) : void {
    this.messageSource.next(capsule);
  }

  sendButtonState(capsule : ButtonStateCapsule) : void {
    this.BState.next(capsule);
  }

  getButtonStateEvent() : Observable<any> {
    return this.BState.asObservable();
  }

  sendClickEvent(buttonType : string) : void {
    this.BSubject.next(buttonType);
  }
  
  getClickEvent() : Observable<any> {
    return this.BSubject.asObservable();
  }
}