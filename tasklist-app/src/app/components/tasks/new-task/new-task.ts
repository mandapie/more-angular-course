import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
  @Input({ required: true }) taskUserId!: string;

  @Output() close = new EventEmitter<void>(); // no longer need an output since we're using services, but keeping it here to show an example
  // @Output() add = new EventEmitter<NewTaskData>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // instead of using a constructor, you can also use the `inject()` provider to grab the service
  private tasksService = inject(TasksService);

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDate
    }, this.taskUserId);

    this.close.emit();

    // // no longer need to emit this to the parent component since we're using services.
    // // But I'm keeping this here on how to emit an object
    // this.add.emit({
    //   title: this.enteredTitle,
    //   summary: this.enteredSummary,
    //   dueDate: this.enteredDate
    // });
  }
}
