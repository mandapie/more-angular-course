import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent]
  // // Another alternative to injectable (from the service). This is an Element Injector.
  // // If this is present, then TaskService will not have the injectable decorator.
  // // But this is commented out because we want to use the Injectable decorator.
  // // Another note is all child components will also have access to TaskService.
  // // With in this case, TaskComponent an all of its child components have access to TasksService.
  // // But AppComponent will not have access. If AppComponent injects TasksService,
  // // it will be a new instance and it is completely isolated from TaskService.
  // providers: [TasksService]
})
export class TasksComponent {}
