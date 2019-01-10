import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {

    constructor(private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
        return this.recipeService.getRecipeById(route.params.id);
    }
}