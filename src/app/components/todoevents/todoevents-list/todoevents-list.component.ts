import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

import { todoEvent } from 'src/app/models/models';
import { TodoEventsService } from 'src/app/services/todoevents.service';



@Component({
  selector: 'app-todoevents-list',
  templateUrl: './todoevents-list.component.html',
  styleUrls: ['../todoevent.css']
})

export class TodoEventsListComponent implements OnInit {

  todoEventsForms: FormArray = this.fb.array([]);
  todoEvents: todoEvent[];


  constructor(private fb: FormBuilder, private todoEventsService: TodoEventsService) { 

    this.todoEventsService.getTodoList()
      .subscribe(res=> this.todoEvents = res as todoEvent[]); 

    this.todoEventsService.getTodoList().subscribe(
      res => { 
        if (res==[])
          this.addTodoEventsForm();
        else{
          // form array per contenere i dati restituiti dalla tabella todoEvent 
          (res as []).forEach((todo:todoEvent)=> {
            this.todoEventsForms.push(this.fb.group({

              id : [todo.id],
              titolo : [todo.titolo],
              dettagli: [todo.dettagli]

              //accountNumber :[bankAccount.AccountNumber, Validators.required],
              //accountHolder :[bankAccount.AccountHolder, Validators.required],
              //bankID : [bankAccount.BankID, Validators.min(1)],
              //IFSC : [bankAccount.IFSC, Validators.required]

            }));
          });
        }
      }
    );
  }
/*
    id: number;
    userID: string;
    causaleID: number;
    
    ticketID: number;
    objTicket: ticket;

    titolo: string;
    dettagli: string;
    dt: Date;
    h_Ini: Date;

*/
  ngOnInit() {
    
    
  }

  addTodoEventsForm(){
    this.todoEventsForms.push(this.fb.group({
      id : [0],
      userID : [''],
      causaleID : [0],
      ticketID : [0],

      titolo : ['', Validators.required],
      dettagli : ['', Validators.required],
      //dt : [0, Validators.min(1)],
      //h_Ini : ['', Validators.required]
    }))
  }
}
