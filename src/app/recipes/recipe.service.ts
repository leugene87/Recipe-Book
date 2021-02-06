import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  //   new Recipe('Pizza',
  //     'Delicious Pizza Paperoni',
  //     'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
  //     [
  //       new Ingredient('paperoni', 12),
  //       new Ingredient('water', 7)
  //     ]),
  //   new Recipe('Pancake',
  //     'Yammy Pancake',
  //     'https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/mccormick/q/2000/quick_and_easy_french_toast_new_2000x1125.jpg?rev=9b2607d0dece40daa4b102d5d07a1880&vd=20200628T070902Z&hash=C5615934E26A451872F4DC1C9E10718A',
  //     [
  //       new Ingredient('vanilla', 0.12),
  //       new Ingredient('jam', 200)
  //     ]),
  // ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.notifyRecipesChanged();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.notifyRecipesChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.notifyRecipesChanged();
  }

  deleteIngridient(recIndex: number, ingIndex: number) {
    this.recipes[recIndex].ingredients.splice(ingIndex, 1);
    this.notifyRecipesChanged();
  }

  loadRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.notifyRecipesChanged();
  }

  notifyRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
