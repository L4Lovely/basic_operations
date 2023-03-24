import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Capsule } from './structs/transferStructs';

@Injectable({
  providedIn: 'root'
})
export class QEmitterService {

  defaultCapsule : Capsule = { ansTxt : [''], ansType : ''}

  private messageSource = new BehaviorSubject(this.defaultCapsule);
  currentMessage = this.messageSource.asObservable();

  constructor() { 
  }

  changeMessage(capsule: Capsule) {
    this.messageSource.next(capsule)
  }
}
