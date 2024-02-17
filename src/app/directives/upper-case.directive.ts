import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpperCase]'
})
export class UpperCaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const start = this.el.nativeElement.selectionStart;
    const end = this.el.nativeElement.selectionEnd;
    this.el.nativeElement.value = (event.target as HTMLInputElement).value.toUpperCase();
    this.el.nativeElement.setSelectionRange(start, end);
    event.preventDefault();
  }
}
