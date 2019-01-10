import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, FormArray, Form, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    /*
    When the url: recipes/new is used then recipe = undefined
    The resolver is not used then
    */
    this.route.data.subscribe((data: Data) => {
      this.recipe = data.recipe;
      this.initForm();
      if(this.recipe){
        console.log(this.recipe.id);
      }
    });
  }

  private initForm(){
    let ingredients = new FormArray([]);

    if(this.recipe){
      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormGroup({
          'name' : new FormControl(ingredient.name, Validators.required),
          'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe ? this.recipe.name : '', Validators.required),
      'imagePath': new FormControl(this.recipe ? this.recipe.imagePath : '', Validators.required),
      'description': new FormControl(this.recipe ? this.recipe.description : '', Validators.required),
      'ingredients': ingredients
    });
  }

  isEditMode(){
    return this.recipe !== undefined;
  }

  onAddIngredient(){
    let ingredients : FormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredients.push(new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit(){
    console.log(this.recipeForm);

    if(this.isEditMode()){
      this.recipeService.updateRecipe(this.recipe.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    let ingredients : FormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

}
