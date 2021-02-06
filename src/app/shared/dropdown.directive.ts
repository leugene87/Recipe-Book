import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpened = false;

  @HostListener('click') toggleOpen(eventData: Event): void {
    this.isOpened = !this.isOpened;
  }


}
