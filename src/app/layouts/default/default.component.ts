import { Component, OnInit } from '@angular/core';

import{ ticket } from '../../models/models';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  currDate = new Date(Date());
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
