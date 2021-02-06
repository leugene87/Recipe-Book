import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingSub: Subscription;
  constructor(private shopServ: ShoppingListService) { }
  ngOnDestroy(): void {
    this.ingSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shopServ.getIngredients();
    this.ingSub = this.shopServ.ingridientsChanged.subscribe(
      (ingrs: Ingredient[]) => this.ingredients = ingrs
    );
  }

  onEditItem(index: number): void {
    this.shopServ.startedEditing.next(index);
  }

}
