import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { ticket } from 'src/app/models/models';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['../ticket.css']
})
export class TicketHistoryComponent implements OnInit {

  tickets: ticket[];
  loading = true;
  
  constructor(public ticketService: TicketService) {

   }

   ngOnInit() {
    this.ticketService.getTicketHistory()
    .subscribe(
      res=>   { this.tickets = res as ticket[];
     this.loading = false;
     }
    );
  }

}
