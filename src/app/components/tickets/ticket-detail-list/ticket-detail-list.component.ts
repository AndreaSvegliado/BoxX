import { Component, OnInit } from '@angular/core';
import { TicketDetailService } from 'src/app/services/ticket-detail.service';

@Component({
  selector: 'app-ticket-detail-list',
  templateUrl: './ticket-detail-list.component.html',
  styleUrls: ['../ticket.css']
})
export class TicketDetailListComponent implements OnInit {

  constructor(public ticketDetailService: TicketDetailService) { 

    //ATTENZIONE: devo passargli l'ID del tiket !
    //this.ticketDetailService.getTicketDetailList();
    //  .refreshList();
  }
/*
  populateForm(objPaymentDetail: PaymentDetail){
    //this.service.formData=objPaymentDetail;
    //per evitare che i dati del form aggiornino direttamente la griglia prima del POST:
    //assegno un nuovo oggetto clonato da quello passato come parametro
    this.service.formData= Object.assign({}, objPaymentDetail);  
  }
  */
  ngOnInit(): void {
  }

}
