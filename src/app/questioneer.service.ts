import { Injectable }              from '@angular/core';
import { Injector }                from "@angular/core";
import { Component, OnInit }       from '@angular/core';
import { Question }                from './structs/questionStruct';
import * as LPI_FIQ_DATA           from '../assets/questionbase/LPI2019-FIQ.json';
import * as LPI_SCQ_DATA           from '../assets/questionbase/LPI2019-SCQ.json';
import * as LPI_MCQ_DATA           from '../assets/questionbase/LPI2019-MCQ.json';
import * as LPI_ALL_DATA           from '../assets/questionbase/LPI2019-ALL.json';

@Injectable({
  providedIn: 'root'
})

export class QuestioneerService implements OnInit {
    static injector : Injector;
    data_FIQ : any = LPI_FIQ_DATA;
    data_SCQ : any = LPI_SCQ_DATA; 
    data_MCQ : any = LPI_MCQ_DATA;
    data_ALL : any = LPI_ALL_DATA;

    currentQ_Data       : any;
    currentQSet_rndNums : any;

    constructor() {
        this.currentQ_Data = [];
    }

    ngOnInit() {
    }

    //generates a mixed set of Question[]
    private _generateQSetMixed(datafile : string) : Question[]{
        let dataSet   : any        = datafile === 'ALL' ? this.data_ALL : 
                                    (datafile === 'SCQ' ? this.data_SCQ : 
                                    (datafile === 'MCQ' ? this.data_MCQ : 
                                    (datafile === 'FIQ' ? this.data_FIQ : null)))
        let questions : Question[] = [];
        let rndNums   : number[]   = this._getQNumberArray(dataSet).sort(() => Math.random() - 0.5);
        
        this.currentQ_Data       = dataSet;
        this.currentQSet_rndNums = rndNums;

        for (let num in rndNums){
            let q : Question = {qid   : dataSet[rndNums[num]].qid,
                                qtyp  : dataSet[rndNums[num]].qtyp,
                                qtxt  : (() => { let s = ''; for(let c of dataSet[rndNums[num]].qtxt){ s += c; } return s; })(),
                                qans  : (() => { let a : string[] = []; for(let d of dataSet[rndNums[num]].qanswers){ a.push(d.txt); } return a; })()} 
            q.qtxt = q.qtxt.replace(/([,|.|?])([\w|\(])/g, '$1 $2');
            questions.push(q);
        }
        return questions;
    }

    _getAnswerSet(id : number) : any {
        for (let i = 0; i < this.currentQ_Data.length; i++) {
            if (id === this.currentQ_Data[i].qid){
                return (() => {let a = []; for(let ans of this.currentQ_Data[i].qanswers){a.push(ans.correct)} return a;})();
                break;
            }
        }
    }

    //get json data set length and transform it into a number[]
    private _getQNumberArray(dataSet : any) : number[]{
        return [...Array(dataSet.length).keys()];
    }

    getQSetMixed(datafile : string) : Question[]{
        return this._generateQSetMixed(datafile);
    }
}