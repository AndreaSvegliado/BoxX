import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { ticketCausale } from 'src/app/models/models';
import { TicketCausaliService } from 'src/app/services/ticket-causali.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['../ticket.css']
})
export class TicketDetailComponent implements OnInit {

  ticketCausali:ticketCausale[];

  constructor(public serviceDetails: TicketDetailService, public serviceCausali: TicketCausaliService) { 

    this.serviceCausali.getCausaliList()
    .subscribe(
      res=>   this.ticketCausali = res as ticketCausale[]
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

    console.log(this.serviceDetails.formData.id);

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
    console.log("Update Record (TODO!!!)");

    
    this.serviceDetails.putTicketDetail();
    /*
    this.serviceDetails.putTicketDetail().subscribe(
      res => { 
        this.resetForm(form);
        //this.toastr.info('Record aggiornato correttamente', 'Payment Detail Register');
        //this.serviceDetails.refreshList();
      },
      err => {console.log(err);  }
    )
    */
  }
}


