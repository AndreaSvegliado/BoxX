export interface currentUser {
    userID: string;
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
    h_Ini: Date;
    h_End: Date;
    note;
}

export interface ticketCausale {
    id: number;
    causaleDesc: string;
}


export class ticketEvent{
    allDay: boolean;
    color: string;
    date: string;
    end: Date;
    endTime?: string;
    id: string;
    start: Date;
    startTime?: string;
    textColor: string;
    title: string;
}

export class todoEvent{
    id: number;
    userID: string;
    causaleID: number;

    ticketID: number;
    objTicket: ticket;

    isClosed: boolean;
    titolo: string;
    dettagli: string;
    dt: Date;
    h_Ini: Date;
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
