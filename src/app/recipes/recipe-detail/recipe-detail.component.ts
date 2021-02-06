import { RecipeListComponent } from './../recipe-list/recipe-list.component';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  @Input() recipe: Recipe;


  constructor(private shopServ: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

  }


  toShopList(): void {
    this.shopServ.addIngridients(this.recipe.ingredients.slice());
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
