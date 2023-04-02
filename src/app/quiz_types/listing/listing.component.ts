import { Component }          from '@angular/core';
import { QuestioneerService } from '../../questioneer.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent {
    mode : string;

    data_SCQ : any;
    data_MCQ : any;
    data_FIQ : any;

    currentAnswer? : any;
    checkedID?     : any;

    correctArray : any;

    constructor(private DataS : QuestioneerService) {
        this.mode = '';

        this.data_FIQ = DataS.getQSetMixed('FIQ');
        this.data_SCQ = DataS.getQSetMixed('SCQ');
        this.data_MCQ = DataS.getQSetMixed('MCQ');

        //console.log(this.data_SCQ[0].qans)
    }

    onModeClick(mode : string){
        this.mode = mode;
    }

    onRadioInput(QID : number, radioID : number) {
        console.log(QID, radioID) 
        this.currentAnswer = [QID, radioID];
    }

    onCheckClicked(QID : number) {
        this.checkedID = QID;
    }
}