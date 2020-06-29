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

  titoloChanged: any;

  constructor(private fb: FormBuilder, private todoEventsService: TodoEventsService) {

    //Grid List
    //this.todoEventsService.getTodoEventList()
    //  .subscribe(res=> this.todoEvents = res as todoEvent[]);

    this.todoEventsService.getTodoEventList().subscribe(
      res => {
        if (res==[])
          this.addTodoEventsForm();
        else{
          //sort per far comparire i todo chiusi sotto
          res.sort((a, b) => a.isClosed < b.isClosed ? -1 : a.isClosed > b.isClosed ? 1 : 0);

          (res as []).forEach((todo:todoEvent) =>      {  
            this.todoEventsForms.push(this.fb.group({

              id : [todo.id],
              userID: [todo.userID],
              titolo : [todo.titolo],
              dettagli: [todo.dettagli],
              isClosed: [todo.isClosed]
              //dt: Date;
              //h_Ini: Date;

              //userID: string;
              //causaleID: number;
              //ticketID: number;
              //objTicket: ticket;

              //accountNumber :[bankAccount.AccountNumber, Validators.required],
              //bankID : [bankAccount.BankID, Validators.min(1)],
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
  //this.todoEventsForms.push(this.fb.group({         //per aggiungere in coda
  this.todoEventsForms.insert(0,this.fb.group({
      id : [0],
      userID : [''],
      causaleID : [0],
      ticketID : [0],

      titolo : ['', Validators.required],
      dettagli : ['', Validators.required],
      isClosed: false
      //dt : [0, Validators.min(1)],
      //h_Ini : ['', Validators.required]
    }))
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
    onChange(fg:FormGroup) {
      
      //console.log(fg.controls['titolo'].dirty );
      /*
      if(fg.controls['titolo'].value == '' && fg.controls['dettagli'].value == '' ){
        //Se record vuoto non salvo
        //AS: (TODO!) ATTENZIONE: se record esistente, pulisco i campi --> non salva
        return;
      }
      */
      if(fg.controls['isClosed'].dirty ||
         fg.controls['titolo'].dirty || 
         fg.controls['dettagli'].dirty){

        this.loading = true;
        if(fg.value.id == 0){
          //Insert
          this.todoEventsService.postTodoEvent(fg.value).subscribe(
            (res: any) => {
              console.log("OK INSERT");
              fg.patchValue ({ id: res.id });     ///riporto l'id generato dall'insert
              //this.showNotification('insert');
            },
            err => {
              console.log(err);
            });
        }
        else{
          //Update
          this.todoEventsService.putTodoEvent( fg.value).subscribe(
            (res: any) => {
              console.log("OK UPDATE");
              //this.showNotification('update');
            });
        }
        this.loading = false;
      }
    }

  ///--------------- NON USATA ------------------
  recordSubmit(fg:FormGroup)  {
    this.loading = true;
    if(fg.value.id == 0){
      //Insert
      this.todoEventsService.postTodoEvent(fg.value).subscribe(
        (res: any) => {
          fg.patchValue ({ id: res.id });     ///riporto l'id generato dall'insert
          //this.showNotification('insert');
        },
        err => {
          console.log(err);
         });
    }
    else{
      //Update
      this.todoEventsService.putTodoEvent( fg.value).subscribe(
        (res: any) => {
          //this.showNotification('update');
        });
    }
    this.loading = false;

  }
}
