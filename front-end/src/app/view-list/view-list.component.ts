/*view-list.component.ts*/

import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ListService } from '../services/list.service';
import { List } from '../models/List';


@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {

  //lists propoerty which is an array of List type
  private lists: List[] = [];
  //@Output() addTask: EventEmitter<List> = new EventEmitter<List>();

  constructor(private listServ: ListService) { }

  ngOnInit() {

    //Load all list on init
    this.loadLists();
  }

  public loadLists() {

    //Get all lists from server and update the lists property
    this.listServ.getAllLists().subscribe(
        response => this.lists = response,)
  }

  //deleteList. The deleted list is being filtered out using the .filter method
  public deleteTask(list: List) {
    this.listServ.deleteTask(list._id).subscribe(
      response =>    this.lists = this.lists.filter(lists => lists !== list),)
    }
    public onAddTask(newTask) {
      this.lists = this.lists.concat(newTask);
  }
    /*public onSubmit() {
      console.log(this.newTask.priority);
      this.listServ.addTask(this.newTask).subscribe(
          response=> {
              console.log(response);
              if(response.success== true)
                  this.addTask.emit(this.newTask);
          },
      );
  
    }*/
}