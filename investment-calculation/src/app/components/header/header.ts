import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParameterModel } from '../../models/parameter.model';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  @Output() parameter = new EventEmitter<ParameterModel>();

  parameterInput: ParameterModel = {
    initialInvestment: 0,
    duration: 0,
    annualInvestment: 0,
    expectedReturn: 0
  };

  onSubmit() {
    this.parameter.emit(this.parameterInput);
  }
}
