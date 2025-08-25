import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentsService } from '../../services/investments';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent {
  constructor(private investmentsService: InvestmentsService) {}

  get results() {
    return this.investmentsService.results();
  }
}
