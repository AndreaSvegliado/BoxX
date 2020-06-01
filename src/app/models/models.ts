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