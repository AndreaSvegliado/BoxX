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
  
  ticketID;
  //public TicketID: number

  ticketDetails:ticketDetail[];

  constructor(private route: ActivatedRoute, private router : Router, public ticketDetailService: TicketDetailService ) { 

    let ID = this.route.snapshot.params['ID'];
    //this.ticketID = ID;

    this.ticketID = this.route.snapshot.params['ID'];
    console.log("ANDREA");
    console.log(this.ticketID);
    

    this.ticketDetailService.getTicketDetailList(this.ticketID)
    .subscribe(
      
      res=>   {this.ticketDetails = res as ticketDetail[];
      console.log ('aggiornamento in corso...');

    }
    );  


  }

  ngOnInit(): void {
    this.ticketDetailService.refreshList(this.ticketID);
  }

  
  populateForm(objTicketDetail: ticketDetail){
    //this.ticketDetailService.formData=objTicketDetail;
    
    //per evitare che i dati del form aggiornino direttamente la griglia prima del POST:
    //assegno un nuovo oggetto clonato da quello passato come parametro
    this.ticketDetailService.formData= Object.assign({}, objTicketDetail);  

  }
  
  onDelete(id: BigInteger){
    if(confirm("Si conferma la cancellazione del record?")){
      this.ticketDetailService.deleteTicketDetail(id)
        .subscribe(res => {
        this.ticketDetailService.refreshList(this.ticketID);
        
        //this.toastr.warning('Record cancellato', 'Payment Detail Register');
      },
      err=> {
        console.log(err);
      });
    }
  }
}
