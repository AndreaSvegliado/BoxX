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
  loading = true;

  constructor(private fb: FormBuilder, private todoEventsService: TodoEventsService) {

    //Grid List
    this.todoEventsService.getTodoEventList()
      .subscribe(res=> this.todoEvents = res as todoEvent[]);

    this.todoEventsService.getTodoEventList().subscribe(
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

              //dt: Date;
              //h_Ini: Date;

              //userID: string;
              //causaleID: number;
              //ticketID: number;
              //objTicket: ticket;

              //accountNumber :[bankAccount.AccountNumber, Validators.required],
              //accountHolder :[bankAccount.AccountHolder, Validators.required],
              //bankID : [bankAccount.BankID, Validators.min(1)],
              //IFSC : [bankAccount.IFSC, Validators.required]

            }));
            this.loading = false;
          });
        }
      }
    );
  }

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

  recordSubmit(fg:FormGroup)  {
      this.loading = true;
      if(fg.value.id == 0){
        //Insert
        this.todoEventsService.postTodoEvent(fg.value).subscribe(
          (res: any) => {
            //console.log("OK INSERT");
            fg.patchValue ({ id: res.id });     ///riporto l'id generato dall'insert
            //this.showNotification('insert');
            this.loading = false;
          },
          err => {
            console.log(err);
            this.loading = false;
           });
      }
      else{
        //Update
        this.todoEventsService.putTodoEvent( fg.value).subscribe(
          (res: any) => {
            //this.showNotification('update');
            this.loading = false;

          });
      }

    }

    onDelete(id, i) {
      if (id == 0)
        this.todoEventsForms.removeAt(i);
      else if (confirm('Si conferma la cancellazione del record ?'))
        this.todoEventsService.deleteTodoEvent(id).subscribe(
          res => {
            this.todoEventsForms.removeAt(i);
            //this.showNotification('delete');
          });
    }


}
