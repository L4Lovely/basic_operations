import { Component, Input, OnInit } from '@angular/core';
import { QEmitterService }          from '../../qemitter.service';
import { ButtonStateCapsule }       from '../../structs/buttonStateCapsule';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})

export class SequencerComponent implements OnInit{
    @Input() quizTitle?        : string;
    @Input() solutionDisabled? : boolean;
    @Input() backDisabled?     : boolean;
    @Input() nextDisabled?     : boolean;

    constructor(private CommS : QEmitterService){
      this.backDisabled = true;
      this.nextDisabled = false;
    }

    ngOnInit() {
      this.CommS.getButtonStateEvent().subscribe((bStateCap : ButtonStateCapsule) => { this.setButtonState(bStateCap); })
    }

    setButtonState(stateCapsule : ButtonStateCapsule) : void {
      this.nextDisabled = stateCapsule.target === 'NEXT' ? stateCapsule.disabled : false;
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
}