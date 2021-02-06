import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { SelectItemComponent } from './recipe-list/select-item/select-item.component';
import { RecipeResolverService } from './recipe-resolver.service';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SelectItemComponent },
      { path: 'new', component: EditRecipeComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: EditRecipeComponent, resolve: [RecipeResolverService] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
