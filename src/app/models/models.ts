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
    tecnico:string;
    cliente: string;
    ragsoc: string;
    iconURL: string;
}