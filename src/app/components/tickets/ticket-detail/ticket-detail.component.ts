import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { ticketCausale, ticketDetail } from 'src/app/models/models';
import { TicketCausaliService } from 'src/app/services/ticket-causali.service';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter, NgbCalendar, NgbTimeAdapter, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, NumberSymbol } from '@angular/common';
import { stringify } from 'querystring';
import { DateAdapter, MatSnackBarConfig, MatSnackBar } from '@angular/material';


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
export class CustomAdapter extends NgbDateAdapter<string> {

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

// MA QUESTA PARTE SERVE??? MI PARE DI NO???
// export class NgbdDatepickerAdapter {

//   model1: string;
//   model2: string;

//   constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {}

//   get today() {
//     return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
//   }
// }

/* *******************************         TIME ADAPTER        *********************/

@Injectable()
  export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

    fromModel(value: string| null): NgbTimeStruct | null {
      if (!value) {
        return null;
      }
      const split = value.split(':');
      return {
        hour: parseInt(split[0], 10),
        minute: parseInt(split[1], 10),
        second: parseInt(split[2], 10)
      };
    }

    toModel(time: NgbTimeStruct | null): string | null {
      return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
    }
  }

/* *******************************      FINE TIME ADAPTER      *********************/

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['../ticket.css'],

  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    //{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}
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
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!= null)
      form.resetForm();
      
    this.serviceDetails.formData ={
      id: 0,
      ticketID: 0,
      causaleID: 0,
      causale:null,
      dt: null,
      h_Ini: null,
      h_End: null,
      note: null
    }
  }


  onSubmit(form:NgForm){
    //form.value        //AS: oggetto in formato JSON contenente i campi del form

    /*
    console.log("Submit");
    console.log(this.serviceDetails.formData.id);
    */
    //if(form.value.PMid==0){
    if(this.serviceDetails.formData.id ==0){
      this.InsertRecord(form);
    }
    else{
      this.UpdateRecord(form);
    }
  }

  InsertRecord(form:NgForm){
    
    console.log("Insert Record (TODO!!!)");

    
/*
    this.service.postTicketDetail().subscribe(
      res => { 
        this.resetForm(form);
        //this.toastr.success('Record inserito correttamente', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {console.log(err);  }
    )
  */
  }

  UpdateRecord(form:NgForm){
    
    console.log("Update Record");

    this.serviceDetails.putTicketDetail().subscribe(
      res => { 
        //this.toastr.info('Record aggiornato correttamente', 'Payment Detail Register');
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
}




function pad(number): string {
  return number < 10 ? `0${number}` : number;
}

function equal(t1: TimeStructure, t2: TimeStructure): boolean {
  if (!t1) {
    return !t2;
  }
  return (!t1 && !t2) || (t1 && t2 && t1.hour === t2.hour && t1.minute === t2.minute);
}

export class NgbdDatepickerAdapter {

  model1: string;
  model2: string;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {}

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}


class StringTimeFormat {
  private currentValue: TimeStructure;

  toStructure(timeAsString: string): TimeStructure {
    if (!timeAsString) {
      this.currentValue = null;
    }
    else {
      const parts = timeAsString.split(':');
      const newValue = {
        hour: +parts[0],
        minute: +parts[1]
      };

      if (!equal(this.currentValue, newValue)) {
        this.currentValue = newValue;
      }
    }
    return this.currentValue;
  }

  fromStructure(t: TimeStructure): string {
    return t && `${pad(t.hour)}:${pad(t.minute)}}`;
  }




  
}
