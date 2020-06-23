import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { ticketCausale, ticketDetail } from 'src/app/models/models';
import { TicketCausaliService } from 'src/app/services/ticket-causali.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbCalendar, NgbTimeAdapter, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, NumberSymbol } from '@angular/common';
import { stringify } from 'querystring';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { isNull } from 'util';


interface TimeStructure {
  hour: number;
  minute: number;
}

/* *******************************        DATE ADAPTER         *********************
Questa prima parte (NgbDateAdapter) gestisce il collegamento con ngModel
Verrà injectato
Il date adapter che si chiama CustomAdapter viene qui definito
poi viene inserito nei provider del component come {provide: NgbDateAdapter, useClass: CustomAdapter},

 */
@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);

      return {
        day : parseInt(date[2], 10), //qui su stackblitz si trova parseInt(date[0], 10),....che non è il day
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10) //qui su stackblitz si trova parseInt(date[2], 10),....che non è il year
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + pad( date.month) + this.DELIMITER + pad( date.day) : null;
    //return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null; era così...invertito
  }
}
/* *******************************   FINE DATE ADAPTER         *********************

/* *******************************       DATE PARSER           *********************
Questa seconda parte (NgbDateParserFormatter) gestisce come la data inserita da tastiera viene gestita
(cioè uno deve digitare 13/3/2020 e non 3/13/2020)
 */

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2],10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
/* *******************************      FINE DATE PARSER       *********************/
/* *******************************      FUNZIONI ACCESSORIE    *********************/
function pad(number): string {
  return number < 10 ? `0${number}` : number;
}

function equal(t1: TimeStructure, t2: TimeStructure): boolean {
  if (!t1) {
    return !t2;
  }
  return (!t1 && !t2) || (t1 && t2 && t1.hour === t2.hour && t1.minute === t2.minute);
}
/* *******************************    FINE FUNZIONI ACCESSORIE  *********************/


/* *******************************         TIME ADAPTER        *********************/

@Injectable()
  export class CustomTimeAdapter extends NgbTimeAdapter<string> {

    readonly DELIMITER = ':';

    fromModel(value: string| null): NgbTimeStruct | null {

      if (!value) {
        return null;
      }

      //1900-02-01T07:02:00 --> split per ottenere l'ora dalla data
      const split1 = value.split("T");
      const split = split1[1].split(this.DELIMITER);

      return {
        hour: parseInt(split[0], 10),
        minute: parseInt(split[1], 10),
        second: parseInt(split[2], 10)
      };
    }

    toModel(time: NgbTimeStruct | null): string | null {
      //return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
      return time != null ?  `1900-01-01T${pad(time.hour)}:${pad(time.minute)}:00` : null;
    }
  }

/* *******************************      FINE TIME ADAPTER      *********************/

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['../ticket.css'],

  providers: [
    {provide: NgbDateAdapter, useClass: CustomDateAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: NgbTimeAdapter, useClass: CustomTimeAdapter}
  ],
  //encapsulation: ViewEncapsulation.None // <------ serve per poter modificare css delle classi create da Angular

})

export class TicketDetailComponent implements OnInit {

  spinners = false;

  convert2Int(oraStringa:string){
    return oraStringa ? parseInt(oraStringa) : 0;
  }

  toggleSpinners() {
      this.spinners = !this.spinners;
  }

  //timeFormat = new StringTimeFormat();

  ticketCausali:ticketCausale[];
  ticketDetails:ticketDetail[];

  constructor(  private snackBar : MatSnackBar, public serviceDetails: TicketDetailService, public serviceCausali: TicketCausaliService) {

    this.serviceCausali.getCausaliList()
    .subscribe(
      res=> this.ticketCausali = res as ticketCausale[]
      );
  }

  ngOnInit() {
    this.resetForm(null);
  }

  resetForm( form?:NgForm  ){
    if(form != null)
      form.resetForm();

    this.serviceDetails.formData ={
      id: 0,
      ticketID: this.serviceDetails.ticketID ,
      causaleID: 0,
      causale:null,
      dt: null,
      h_Ini: null,
      h_End: null,
      note: null
    }
    //Attenzione: serve per inibire la submit del form nel caso di nuovo record
    return false;
  }


  onSubmit(form:NgForm){
    //form.value        //AS: oggetto in formato JSON contenente i campi del form

    if(this.serviceDetails.formData.id ==0)
      this.InsertRecord(form);
    else
      this.UpdateRecord(form);
  }

  InsertRecord(form:NgForm){

    this.serviceDetails.postTicketDetail().subscribe(
      res => {
        this.serviceDetails.refreshList(this.serviceDetails.formData.ticketID);
        this.resetForm(form);

        this.ShowMessage("Record inserito");
      },
      err => {
        console.log(err);
        this.ShowMessage("Errore nel salvataggio", "", true);
       }
    )
  }

  UpdateRecord(form:NgForm){

    this.serviceDetails.putTicketDetail().subscribe(
      res => {
        this.serviceDetails.refreshList(this.serviceDetails.formData.ticketID);
        this.resetForm(form);

        this.ShowMessage("Record aggiornato");
      },
      err => {
        console.log(err);
        this.ShowMessage("Errore nel salvataggio", "Bravo merlo", true);
      }
    )
  }

  CausaleID_toNumber(){
    this.serviceDetails.formData.causaleID = + this.serviceDetails.formData.causaleID;
  }
  TicketID_toNumber(){
    //console.log ("ticket_ID_toNumber");
    this.serviceDetails.formData.ticketID = + this.serviceDetails.formData.ticketID;
  }

  // snackbar
  ShowMessage(msg: string, title?: string, hasErrors: boolean= false ) {
    let config = new MatSnackBarConfig();
    config.verticalPosition  = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;

    if(hasErrors){
      config.panelClass =  ['error-class'];
      console.log("ShowMessage: hasErrors");
    }
    //else
    //  config.panelClass =  ['ng-deep'];

    if(title != null)
      this.snackBar.open(msg, title, config);
    else
      this.snackBar.open(msg,null, config);
  }


  valueStart;
  valueEnd;
  StartTime = new FormControl('', (controlStart: FormControl) => {
    this.valueStart = controlStart.value;
    //console.log("valuestart_START"+this.valueStart);
    //console.log("valueend_START"+this.valueEnd);
    if (!this.valueStart) {return null;}
    if (this.valueStart>=this.valueEnd) {return {start_end: true};}
    //if (value.getTime < 12) {return {tooEarly: true};}
    //if (value.hour > 13) {return {tooLate: true};}
    return null;
  });

  EndTime = new FormControl('', (control: FormControl) => {
    this.valueEnd = control.value;
    //console.log("valuestart_END"+this.valueStart);
    //console.log("valueend_END"+this.valueEnd);
    //console.log (this.valueEnd);
    if (!this.valueEnd) {return null;}
    if (this.valueStart>=this.valueEnd) {return {start_end: true};}
    //if (value.getTime < 12) {return {tooEarly: true};}
    //if (value.hour > 13) {return {tooLate: true};}
    return null;
  });

}




