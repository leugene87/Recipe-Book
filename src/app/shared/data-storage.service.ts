import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipesSubscription: Subscription;

  constructor(private http: HttpClient, private recipeServise: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeServise.getRecipes();
    this.http.put('https://ng-course-recipe-book-5c864-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-5c864-default-rtdb.firebaseio.com/recipes.json'
    ).pipe(
      map((recipes: Recipe[]) => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingridients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeServise.loadRecipes(recipes);
      })
    );


  }
}
