import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe(
      (updatedRecipes: Recipe[]) => {
        this.recipes = updatedRecipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

}
