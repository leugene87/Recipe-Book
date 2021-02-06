import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Water', 100),
    new Ingredient('Floor', 200),
    new Ingredient('Paperoni', 20),
  ];

  startedEditing = new Subject<number>();

  ingridientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.getIngredients()[index];
  }

  updateIngridient(i: number, ingr: Ingredient): void {
    const updated = this.ingredients[i];
    updated.name = ingr.name;
    updated.amount = ingr.amount;
    this.ingredients[i] = updated;
  }

  removeIngridient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  addIngridient(ingr: Ingredient): void {
    this.ingredients.push(ingr);
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  addIngridients(ingrs: Ingredient[]): void {


    Array.prototype.push.apply(this.ingredients, ingrs);


    this.ingridientsChanged.next(this.ingredients.slice());
  }
}
