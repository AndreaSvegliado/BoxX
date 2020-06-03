import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Time } from '@angular/common';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

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
    causale: ticketCausale;
    dt: Date;
    h_Ini: string;
    h_End: Time;
    note;
    //public Nullable<TimeSpan> H_Ini { get; set; }
    //public Nullable<TimeSpan> H_End { get; set; }
}

export interface ticketCausale {
    id: number;
    causaleDesc: string;
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