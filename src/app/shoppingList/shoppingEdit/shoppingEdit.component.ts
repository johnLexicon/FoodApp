import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shoppingEdit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 
    @ViewChild('f') slForm: NgForm;
    startEditingSubscription: Subscription;
    editMode: boolean = false;
    editIngredientIndex: number;
    editIngredient: Ingredient;

    constructor(private shoppingListService: ShoppingListService){}

    ngOnInit(){
        this.startEditingSubscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
            this.editMode = true;
            this.editIngredientIndex = index;
            this.editIngredient = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
                name: this.editIngredient.name,
                amount: this.editIngredient.amount
            });
        });
    }

    onSubmit(){
        const ingredientName : string = this.slForm.value.name;
        const ingredientAmount : number = Number.parseInt(this.slForm.value.amount);
        const ingredient: Ingredient = new Ingredient(ingredientName, ingredientAmount);
        if(this.editMode){
            this.shoppingListService.editIngredient(this.editIngredientIndex, ingredient);
        }
        else{
            this.shoppingListService.addIngredient(ingredient);
        }
        this.slForm.reset();
        this.editMode = false;
    }

    onClear(){
        this.slForm.reset();
        this.editMode = false;
    }

    onDelete(index: number){
        this.onClear();
        this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    }

    ngOnDestroy(){
        this.startEditingSubscription.unsubscribe();
    }
}