import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';

const routes1: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    FormsModule,
    SharedModule
  ],
  exports: [
    RouterModule,
    ShoppingEditComponent,
  ]
})
export class ShoppingListModule { }
