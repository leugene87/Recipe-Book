import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthComponent
  ], imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedModule
  ], exports: [
    AuthComponent,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
