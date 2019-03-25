import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[];
  tasks$: BehaviorSubject<Task[]>;

  constructor() {
    // initializing the tasks list observable with list of tasks
    this.tasks = [
      {
        id: 1,
        title: "Task 1",
        done: true
      },{
        id: 2,
        title: "Task 2",
        done: false
      }, {
        id: 3,
        title: "Task 3",
        done: true
      }];
    this.tasks$ = new BehaviorSubject<Task[]>(this.tasks);
  }

  /**
   * returns the observable of tasks
   */
  getTasks(): Observable<Task[]>{
    return this.tasks$.asObservable();
  }


  addTask(title: string){
    console.log("in service: "+title);
    // creating enw task object
    let newTask = this.createTaskObject(title);
    //  adding task object to list
    this.tasks.push(newTask);
    // updating tasks$ behaiviour subject
    this.tasks$.next(this.tasks);
  }

  //  toggle done value of task
  toggleTask(id: number){
    // find the id of the task
    let task = this.tasks.filter((task)=>{
      return task.id === id;
    })[0];
    let index = this.tasks.findIndex((item)=>{
      return item.id === id;
    })
    this.tasks[index].done = !this.tasks[index].done;
    this.tasks$.next(this.tasks);
    // toggle this task in firebase and then update frontend
  }

  deleteTask(id: number){
    let newTasks = this.tasks.filter((task)=>{
      return task.id !== id;
    });
    this.tasks = newTasks;
    this.tasks$.next(this.tasks);
  }

  /**
   * create a task type object from title given
   */
  createTaskObject(title: string): Task{
    let obj = {
      id: new Date().getTime(),
      title: title,
      done: false
    }
    console.log(obj);
    return obj;
  }

}
