import { Component, Input } from '@angular/core';
import { TaskItem } from "./task-item/task-item";
import { NewTaskData } from '../../models/task.model';
import { NewTask } from './new-task/new-task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskItem, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  // ? indicates the property can be undefined
  @Input() selectedUserName?: string;
  @Input({required:true}) selectedUserId!: string;
  isAddingTask = false;
  
  constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.selectedUserId);
  }

  onOpenNewTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(task: NewTaskData) {
    this.tasksService.addTask(task, this.selectedUserId);

    this.onCloseAddTask();
  }
}
