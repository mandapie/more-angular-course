import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultModel } from '../../models/result.model';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent {
  @Input() results: ResultModel[] = []; 
}
