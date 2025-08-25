import { Injectable, signal } from '@angular/core';
import { ParameterModel } from '../models/parameter.model';
import { ResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {
  results = signal<ResultModel[]>([]);

  calculateInvestmentResults(parameter: ParameterModel) {
    const annualData: ResultModel[] = [];
    let investmentValue = parameter.initialInvestment;

    for (let i = 0; i < parameter.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (parameter.expectedReturn / 100);
      investmentValue += interestEarnedInYear + parameter.annualInvestment;
      const totalInterest =
        investmentValue - parameter.annualInvestment * year - parameter.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: parameter.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: parameter.initialInvestment + parameter.annualInvestment * year,
      });
    }

    this.results.set(annualData);
  }
}