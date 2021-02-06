import { Recipe } from './../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from './../recipe.service';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;



  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value['descri'],
      this.recipeForm.value['mage'],
      this.recipeForm.value['ingrIs']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.router.navigate(['/recipes']);
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDescr = '';
    let ingridients = new FormArray([]);

    if (this.editMode) {
      const recipeEdit = this.recipeService.getRecipe(this.id);
      recipeName = recipeEdit.name;
      recipeImg = recipeEdit.imagePath;
      recipeDescr = recipeEdit.description;
      let ingrOs: Ingredient[] = recipeEdit['ingredients'];
      if (ingrOs != null) {
        for (let i of ingrOs) {
          ingridients.push(
            new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      mage: new FormControl(recipeImg, Validators.required),
      descri: new FormControl(recipeDescr, Validators.required),
      'ingrIs': ingridients
    });
  }

  get ingridientControls(): AbstractControl[] {
    return (this.recipeForm.get('ingrIs') as FormArray).controls;
  }

  onAddIngr() {
    (this.recipeForm.get('ingrIs') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancell() {
    this.router.navigate(['/recipes']);
  }

  onDeleteIngr(index: number) {
    // this.recipeService.deleteIngridient(this.id, index);
    (this.recipeForm.get('ingrIs') as FormArray).controls.splice(index, 1);
  }

}
