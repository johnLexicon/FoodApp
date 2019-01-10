import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    deleteIngredient(index: number) {
        this._ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients)
    }
    
    private _ingredients: Ingredient[] = [];
    ingredientsChanged: Subject<Ingredient[]> = new Subject();
    startedEditing: Subject<number> = new Subject();

    get ingredients(): Ingredient[] {
        return this._ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this._ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    getIngredient(index: number){
        return this._ingredients[index];
    }

    /**
     * Method used for adding multiple ingredients without having to emit an event for every
     * added ingredient in the ingredients array.
     */
    addIngredients(ingredients: Ingredient[]){
        this._ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients);
    }

    editIngredient(editIngredientIndex: number, editedIngredient: Ingredient) {
        this._ingredients[editIngredientIndex] = editedIngredient;
        this.ingredientsChanged.next(this._ingredients.slice());
    }
}