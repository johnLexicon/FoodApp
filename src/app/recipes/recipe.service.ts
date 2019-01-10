import { Injectable, EventEmitter } from "@angular/core";
import { ShoppingListService } from "../shoppingList/shoppingList.service";
import { Recipe } from './recipe.model';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    
    //recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();
    recipeChanged: Subject<Recipe[]> = new Subject();

    private _recipes: Recipe[] = [
        new Recipe('Guacamole', 
        'Real mexican', 
        'https://www.cookingclassy.com/wp-content/uploads/2018/01/guacamole-12-500x500.jpg',
        [new Ingredient('avocado', 4), new Ingredient('Jalapeños', 3)]),
        new Recipe('Chilaquiles', 
        'With green sauce', 
        'https://assets.epicurious.com/photos/5609a60d6a59cdb91b5ff614/6:4/w_620%2Ch_413/354951_hires.jpg',
        [new Ingredient('Chicken', 1), new Ingredient('Salsa verde bottle', 1)])
      ];

    constructor(private shoppingListService: ShoppingListService){}

    get recipes() {
        return this._recipes.slice();
    }

    getRecipeById(id: string) {
        for(let recipe of this._recipes){
            if(id === recipe.id){
                return recipe;
            }
        }
        return null;
    }

    addIngredientsToShoppingList(recipe: Recipe){
        this.shoppingListService.addIngredients(recipe.ingredients);
    }

    addRecipe(recipe: Recipe){
        this._recipes.push(new Recipe(recipe.name, recipe.description, recipe.imagePath, recipe.ingredients));
        this.recipeChanged.next(this._recipes.slice());
    }

    updateRecipe(id: string, newRecipe: Recipe){
        for(let recipe of this._recipes){
            if(id === recipe.id){
                recipe.name = newRecipe.name;
                recipe.imagePath = newRecipe.imagePath;
                recipe.description = newRecipe.description;
                recipe.ingredients = newRecipe.ingredients;
            }
        }
        this.recipeChanged.next(this._recipes.slice());
    }

    deleteRecipe(recipe: Recipe){
        this._recipes = this._recipes.filter(item => item !== recipe);
        this.recipeChanged.next(this._recipes.slice());
        console.log(this._recipes);
    }
}