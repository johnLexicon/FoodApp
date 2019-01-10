import { Ingredient } from "../shared/ingredient.model";
import { generateId } from "../shared/utils";

export class Recipe {

    public id: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
        this.id = generateId();
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}