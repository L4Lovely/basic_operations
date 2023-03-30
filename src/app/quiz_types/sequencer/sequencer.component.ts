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
    @Input() solutionHidden?   : boolean;
    @Input() solutionDisabled? : boolean;
    @Input() backDisabled?     : boolean;
    @Input() nextDisabled?     : boolean;

    ACIControlSubscription : any;
    BStateSubscription : any;

    constructor(private CommS : QEmitterService){
      this.backDisabled = true;
      this.nextDisabled = false;
    }

    ngOnInit() {
      this.BStateSubscription = this.CommS.getButtonStateEvent().subscribe((bStateCap : ButtonStateCapsule) => { this.setButtonState(bStateCap); })
    }

    setButtonState(stateCapsule : ButtonStateCapsule) : void {
      if (stateCapsule.target === 'NEXT') {
        this.nextDisabled     = stateCapsule.target === 'NEXT' && stateCapsule.disabled === true ? true : false;
      }
      else if (stateCapsule.target === 'BACK') {
        this.backDisabled     = stateCapsule.target === 'BACK' && stateCapsule.disabled === true ? true : false;
      }
      else if (stateCapsule.target === 'CHECK') {
        this.solutionDisabled = stateCapsule.target === 'CHECK'&& stateCapsule.disabled === true ? true : false;
      }
      else {}
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