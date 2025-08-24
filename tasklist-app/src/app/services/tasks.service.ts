import { NewTaskData } from "../models/task.model";
import { DUMMY_TASKS } from "../database/dummy-tasks";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TasksService {
    tasks = DUMMY_TASKS;

    getUserTasks(userId: string) {
        return this.tasks.filter(task => task.userId === userId);
    }

    addTask(taskData: NewTaskData, userId: string) {
        // use unshift to push item to the front of the array
        this.tasks.unshift({
            id: new Date().toString(),
            userId: userId,
            title: taskData.title,
            summary: taskData.summary,
            dueDate: taskData.dueDate
        });
    }

    removeTask(taskId: string) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}