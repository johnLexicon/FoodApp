import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  chosenRecipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(){
    this.route.data.subscribe((data: Data) => {
      this.chosenRecipe = data.recipe;
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.chosenRecipe);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.chosenRecipe);
    this.router.navigate(["/recipes"]);
  }
}
