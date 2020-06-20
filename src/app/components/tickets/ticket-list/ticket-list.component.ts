import { Component, OnInit } from '@angular/core';
import { ticket } from 'src/app/models/models';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['../ticket.css']
})


export class TicketListComponent implements OnInit {

  tickets;
   //ticketList$ : Observable<Ticket[]>;

   constructor( private tService: TicketService) { }

   ngOnInit() {
     this.tService.getTicketList()
     .subscribe(
       res=>   this.tickets = res as ticket[]
     );   
 
   }
}

