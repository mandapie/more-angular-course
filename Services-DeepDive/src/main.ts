import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// // Alternative way to implement the root injector,
// // but this only captures the injectables on the initial load.
// // Which means if the app is a bit more complex like have lazy loads
// // the components, etc will not be able to register the injectable.
// // This is commented out to show case this method.
// import { TasksService } from './app/tasks/tasks.service';
// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));
