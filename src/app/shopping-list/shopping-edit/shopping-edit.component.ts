import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingrForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ingSubscription: Subscription;


  @Output()
  ingrs: Ingredient[] = [];

  constructor(private shopServ: ShoppingListService) { }
  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingSubscription = this.shopServ.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shopServ.getIngredient(index);
        this.ingrForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAdd(form: NgForm): void {
    const value = form.value;
    const newIngr = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shopServ.updateIngridient(this.editedItemIndex, newIngr);
    } else {
      this.shopServ.addIngridient(newIngr);
    }
    this.onClear();
  }

  onDelete(): void {
    if (this.editMode) {
      this.shopServ.removeIngridient(this.editedItemIndex);
    }
    this.onClear();
  }

  onClear(): void {
    this.ingrForm.reset();
    this.editMode = false;
  }

}
