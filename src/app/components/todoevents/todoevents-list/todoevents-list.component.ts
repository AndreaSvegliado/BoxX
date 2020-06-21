import { Component, OnInit } from '@angular/core';
import { todoEvent } from 'src/app/models/models';
import { TodoEventsService } from 'src/app/services/todoevents.service';

@Component({
  selector: 'app-todoevents-list',
  templateUrl: './todoevents-list.component.html',
  styleUrls: ['../todoevent.css']
})

export class TodoEventsListComponent implements OnInit {

  todoEvents: todoEvent[];


  constructor(private todoEventsService: TodoEventsService) { 
    this.todoEventsService.getTodoList()
    .subscribe(
      res=>   this.todoEvents = res as todoEvent[]
    ); 
  }

  ngOnInit() {
    
    
  }

}
