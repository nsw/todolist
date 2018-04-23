import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../models/List';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  private newTask :List;
  @Output() addTask: EventEmitter<List> = new EventEmitter<List>();
  constructor(private listServ: ListService) { }

  ngOnInit() {
    this.newTask = {
        title: '',
        priority:'',
        description:'',
        _id:''

    }
  }

  public onSubmit() {
    console.log(this.newTask.priority);
    let TaskToAdd =  this.newTask;
    this.listServ.addTask(TaskToAdd).subscribe(
        response=> {
          debugger
            if(response.success== true){
              this.addTask.emit(this.newTask);
            }
               //If success, update the view-list component
        },
    );

    }

}
