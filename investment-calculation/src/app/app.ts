import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInputComponent } from "./components/user-input/user-input";
import { ResultComponent } from "./components/result/result";
import { HeaderComponent } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserInputComponent, ResultComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('investment-calculation');
}
