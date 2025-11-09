import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = signal<Task[]>([]);
    allTasks = this.tasks.asReadonly();

    constructor(private loggingService: LoggingService) {}

    addTask(taskData: {title: string; description: string}) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: "OPEN"
        };

        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
        this.loggingService.log(`added task "${taskData.title}"`);
    }

    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));
        // // Same logic
        // /// update the `tasks` array
        // this.tasks.update((oldTasks) => {
        //     // by mapping every item in the array    
        //     return oldTasks.map((task) => {
        //         // only update the status if the id matches
        //         if (task.id === taskId) {
        //             return {...task, status: newStatus}
        //         } else {
        //         // else, map the same value
        //             return task;
        //         }
        //     });
        // });

        this.loggingService.log(`updated task status to "${newStatus}"`);
    }
}