import { Component, OnInit } from '@angular/core';
import { MatListOption, MatSelectionList, MatButtonToggleChange } from '@angular/material';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks:Task[];
  tasks$: Observable<Task[]>;
  filteredTasks: Task[];
  taskInput: string;
  totalTasks: number;
  remainingTasks: number;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    //  dummy data
    this.tasks$ = this.taskService.getTasks();
    this.tasks$.subscribe((tasks)=>{
      //  updating tasks
      this.tasks = tasks;
      this.filteredTasks = this.tasks;
      // updating remaining number
      this.remainingTasks = this.tasks.filter((tasks)=>{
        return tasks.done == false;
      }).length;
      //  updating total number
      this.totalTasks = this.tasks.length;
    });
  }

  addTask(){
    console.log(this.taskInput);
    this.taskService.addTask(this.taskInput);
    // clear the form
    this.taskInput = "";
  }

  toggleCheckbox(id: number){
    // toggle checkbox with this id
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number){
    this.taskService.deleteTask(id);
    console.log(`task to be deleted: ${id}`);
  }

  /**
   * this fxn filters the task list in
   * @param event event object from mat button toggle
   */
  filter(event: MatButtonToggleChange){
    switch(event.value){
      case "all": this.filterAll();
        break;
      case "completed": this.filterCompleted();
        break;
      case "remaining": this.filterRemaining();
        break;
      default: this.filterAll();
    }
  }

  //  helper methods
  filterAll(){
    this.filteredTasks = this.tasks;
  }

  filterCompleted(){
    this.filteredTasks = this.tasks.filter((task)=>{
      return task.done === true;
    });
  }

  filterRemaining(){
    this.filteredTasks = this.tasks.filter((task)=>{
      return task.done === false;
    });
  }


}
