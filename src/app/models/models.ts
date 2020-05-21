export interface currentUser {
    fullName: string;
    email: string;
    userName: string;
    badge: string;
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