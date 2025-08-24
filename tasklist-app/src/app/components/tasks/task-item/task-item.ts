import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { Card } from "../../shared/card/card";
import { DatePipe } from '@angular/common';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task',
  imports: [Card, DatePipe],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem {
  @Input() selectedUserTask!: Task;

  constructor(private tasksService: TasksService) {}

  onCompleteTask() {
    return this.tasksService.removeTask(this.selectedUserTask.id);
  }
}
