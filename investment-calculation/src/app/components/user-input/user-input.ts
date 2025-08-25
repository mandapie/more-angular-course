import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParameterModel } from '../../models/parameter.model';
import { InvestmentsService } from '../../services/investments';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css'
})
export class UserInputComponent {
  parameterInput = signal<ParameterModel>({
    initialInvestment: 0,
    duration: 0,
    annualInvestment: 0,
    expectedReturn: 0
  });

  constructor(private investmentsService: InvestmentsService) { }

  onSubmit() {
    this.investmentsService.calculateInvestmentResults(this.parameterInput());
  }
}
