import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shoppingList.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredientsChangedSubscription: Subscription;
    ingredients: Ingredient[] = [];

    constructor(private shoppingListService: ShoppingListService){}

    ngOnInit(){
        this.ingredients = this.shoppingListService.ingredients;
        this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        });
    }

    onEditIngredient(index: number){
        this.shoppingListService.startedEditing.next(index);
    }

    ngOnDestroy(): void {
        this.ingredientsChangedSubscription.unsubscribe();
    }
}