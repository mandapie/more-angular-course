import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TemperaturePipe } from './temperature.pipe';
import { SortPipe } from './sort.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe, SortPipe, TemperaturePipe]
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onReset(index: number) {
    // if a pipe is impure, the pipe can detect any Angular changes,
    // which is why we can directly set the value in the og array.
    // The SortPipe detects this change and updates the format accordingly
    this.historicTemperatures[index] = 18;

    // // When a pipe is pure, is it only triggered when a change
    // // of the value or params is passed into the pipe.
    // // This is by default to avoid performance issues, otherwise,
    // // the pipe could potentially get triggered in multiple places multiple times.
    // // In this case, because this is an array, in JS, this is a reference Type.
    // // read more: https://academind.com/tutorials/reference-vs-primitive-values
    // // So when we make a change of a single value in the array,
    // // the reference to the array is still unchanged.
    // // Which is why the pure pipe will not detect this change.
    // // So, we need to copy the values into a new array and then assign it back to the og array
    // const newTemps = [...this.historicTemperatures];
    // newTemps[index] = 18;
    // this.historicTemperatures = newTemps;
  }
}
