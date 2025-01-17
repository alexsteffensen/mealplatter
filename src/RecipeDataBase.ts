import fs from 'fs';
import { Ingredient } from "./Ingredient";
import { MealPlan } from './MealPlan';
import { Recipe } from "./Recipe";

export class RecipeDataBase{
    ingredients: Ingredient[] = [];
    recipes: Recipe[] = [];
    

    loadIngredients(path: string){
        const json = fs.readFileSync(path, 'utf8');
        this.ingredients = JSON.parse(json);
    }

    loadRecipes(path: string){
        const data = fs.readFileSync(path, 'utf8');
        this.recipes = JSON.parse(data);
    }



    findIngredient(name: string): Ingredient[]{
        const ingredient = this.ingredients.filter(ingredient => 
            ingredient.name.toLowerCase().includes(name.toLowerCase()));
        return ingredient;
    }

    getRecipe(name: string): Recipe{
        const recipe = this.recipes.find(recipe => 
            recipe.name.toLowerCase() === name.toLowerCase());
        if(recipe === undefined){
            throw new Error("Recipe not found");
        }
        return recipe;
    }

    findRecipes(category: string): Recipe[]{
        return  this.recipes.filter(recipe => recipe.category.includes(category))
    }

    getRandomRecipeFromCategory(category: string): Recipe{
        const cat = this.findRecipes(category);
        const index = Math.floor(Math.random() * cat.length);
        return cat[index];
    }

    generateMealPlan(): MealPlan[]{
        const breakfast = this.findRecipes("Breakfast");
        const lunch = this.findRecipes("Lunch");
        const dinner = this.findRecipes("Dinner");
        const recipes = [breakfast, lunch, dinner];
        const mealPlans = []
        for(let i = 0; i < 7; i++){
            const mealPlan = new MealPlan();
            recipes.forEach(category => {
                const index = Math.floor(Math.random() * category.length);
                const recipe = category[index];

                //Logic

                mealPlan.recipes.push(recipe);
            });
            mealPlan.calculateMacros();
            mealPlans.push(mealPlan);
        }
        return mealPlans
    }
}
