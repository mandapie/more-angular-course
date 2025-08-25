import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParameterModel } from '../../models/parameter.model';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.html',
  styleUrl: './user-input.css'
})
export class UserInputComponent {
  parameter = output<ParameterModel>();

  parameterInput = signal<ParameterModel>({
    initialInvestment: 0,
    duration: 0,
    annualInvestment: 0,
    expectedReturn: 0
  });

  onSubmit() {
    this.parameter.emit(this.parameterInput());
  }
}
