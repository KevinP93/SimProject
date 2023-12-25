import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
  selector: '[appIpAddressFormat]'
})
export class IpAddressFormatDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue = this.el.nativeElement.value;
    const validIpPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (validIpPattern.test(inputValue)) {
      this.control.control?.setErrors(null);
    } else {
      this.control.control?.setErrors({ 'invalidIpAddress': true });
    }
  }
}
