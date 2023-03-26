import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { QEmitterService }          from '../../qemitter.service';
import { ButtonStateCapsule }       from '../../structs/buttonStateCapsule';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})

export class SequencerComponent implements OnInit, OnDestroy{
    @Input() quizTitle?        : string;
    @Input() solutionDisabled? : boolean;
    @Input() backDisabled?     : boolean;
    @Input() nextDisabled?     : boolean;

    BStateSubscription : any;

    constructor(private CommS : QEmitterService){
      this.backDisabled = true;
      this.nextDisabled = false;
    }

    ngOnInit() {
      this.BStateSubscription = this.CommS.getButtonStateEvent().subscribe((bStateCap : ButtonStateCapsule) => { this.setButtonState(bStateCap); })
    }

    setButtonState(stateCapsule : ButtonStateCapsule) : void {
      this.nextDisabled = stateCapsule.target === 'NEXT' && stateCapsule.disabled === true ? true : false;
      this.backDisabled = stateCapsule.target === 'BACK' ? stateCapsule.disabled : false;
    }

    onNext() : void {
      this.CommS.sendClickEvent('NEXT');
    }

    onBack() : void {
      this.CommS.sendClickEvent('BACK');
    }

    onCheck() : void {
      this.CommS.sendClickEvent('CHECK');
    }

    ngOnDestroy() {
      this.BStateSubscription.unsubscribe();
    }
}