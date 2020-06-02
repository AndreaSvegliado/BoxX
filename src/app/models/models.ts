import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface currentUser {
    fullname: string;
    email: string;
    username: string;
    badge: string;
    token?: string;
}

export interface ticket {
    id: number;
    n_Ticket: string;
    tipoTicket: string;
    statoTicket: string;
    badge: string;
    
    data1: Date;
    customerID: number;
    customer: Customer;
    poi: string;
}

export interface ticketDetail {
    id: number;
    ticketID: number;
    causaleID: number;

    /*
    public DateTime Dt { get; set; }
    public Nullable<TimeSpan> H_Ini { get; set; }
    public Nullable<TimeSpan> H_End { get; set; }
    public string Note { get; set; }
    public virtual TicketCausale Causale { get; set; }*/
}


export interface Customer {
    id:number;
    codice: string;
    ragsoc: string;
    indirizzo: string;
    citta: string;
    prov: string;
    nazione: string;
    poi: string;

}