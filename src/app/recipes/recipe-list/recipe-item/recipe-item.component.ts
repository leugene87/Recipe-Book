import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() currentRecipe: Recipe;
  @Input() id: number;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // this.currentRecipe = this.recipeService.getRecipes()[this.id];
  }




}
