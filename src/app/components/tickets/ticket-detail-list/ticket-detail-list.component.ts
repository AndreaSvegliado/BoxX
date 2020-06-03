import { Component, OnInit, Input } from '@angular/core';
import { TicketDetailService } from 'src/app/services/ticket-detail.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ticketDetail } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-detail-list',
  templateUrl: './ticket-detail-list.component.html',
  styleUrls: ['../ticket.css']
})
export class TicketDetailListComponent implements OnInit {

  //NON FUNZIONA CASSO!!!!
  //@Input() public iTicketID : string;
  
  //mticketID: string;
  //public TicketID: number
   ticketDetails:ticketDetail[];

  constructor(private route: ActivatedRoute, private router : Router, public ticketDetailService: TicketDetailService ) { 

    let ID = this.route.snapshot.params['ID'];

    this.ticketDetailService.getTicketDetailList(ID)
    .subscribe(
      res=>   this.ticketDetails = res as ticketDetail[]
    );  
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
