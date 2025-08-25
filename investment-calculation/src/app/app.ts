import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header";
import { ResultComponent } from "./components/result/result";
import { ParameterModel } from './models/parameter.model';
import { InvestmentsService } from './services/investments';
import { ResultModel } from './models/result.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ResultComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('investment-calculation');
  calculatedResults: ResultModel[] = [];

  constructor(private investmentsService: InvestmentsService) { }

  calculateResult(parameter: ParameterModel) {
    this.calculatedResults = this.investmentsService.calculateInvestmentResults(parameter);
  }
}
