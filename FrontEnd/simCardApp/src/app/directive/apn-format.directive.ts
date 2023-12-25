import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appApnFormat]'
})
export class ApnFormatDirective {

  constructor(private renderer: Renderer2, private ngModel: NgModel, private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const uppercasedValue = value.toUpperCase();

    // Si la valeur commence déjà par "APN", laissez-la inchangée
    if (uppercasedValue.startsWith('APN')) {
      this.renderer.setProperty(this.el.nativeElement, 'value', uppercasedValue);
      this.ngModel.control.setErrors(null);
    } else {
      // Sinon, ajoutez "APN" au début de la valeur
      const newValue = 'APN' + uppercasedValue;
      this.renderer.setProperty(this.el.nativeElement, 'value', newValue);
      this.ngModel.control.setErrors(null);
    }
  }
}
