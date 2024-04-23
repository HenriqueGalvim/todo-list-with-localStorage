import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  tasks: { task: string, completed: boolean }[] = [];
  newTask: string = '';
  total: number = 0;
  
  constructor(private localStorageService: LocalStorageService) {}
  
  ngOnInit() {
    this.tasks = this.localStorageService.get('tasks') || [];
    this.total = this.allTasks();
    this.localStorageService.getTasks();
  }
  
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ task: this.newTask, completed: false });
      this.total = this.allTasks();
      this.localStorageService.set('tasks', this.tasks);
      this.newTask = '';
    }
  }
  
  completeTask(index: number) {
    this.tasks[index].completed = true;
    this.total = this.allTasks();
    this.localStorageService.set('tasks', this.tasks);
  }
  
  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.total = this.allTasks();
    this.localStorageService.set('tasks', this.tasks);
  }
  
  updateTask(index: number, newTask: string) {
    if (newTask.trim() !== '') {
      this.tasks[index].task = newTask;
      this.localStorageService.set('tasks', this.tasks);
      alert("Atualizado com sucesso")
    }
  }
  
  allTasks() {
    let total = 0;
    for (let index = 0; index < this.tasks.length; index++) {
      if (!this.tasks[index].completed) {
        total = total + 1;
      }
    }
    return total;
  }
  
}
