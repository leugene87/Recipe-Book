import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { Spinner2Component } from './spinner2/spinner2.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    Spinner2Component,
    PlaceholderDirective,
    DropdownDirective
  ], imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    Spinner2Component,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule { }
