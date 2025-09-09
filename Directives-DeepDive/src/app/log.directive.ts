import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  },
  hostDirectives: [LogDirective]
})
export class LogDirective {

  constructor(private elementRef: ElementRef) { }

  onLog() {
    console.log('clicked ' + this.elementRef.nativeElement);
  }
}
