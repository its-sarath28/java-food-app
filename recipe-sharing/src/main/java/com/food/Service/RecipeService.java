package com.food.Service;

import java.util.List;

import com.food.Model.Recipe;
import com.food.Model.User;

public interface RecipeService {
    public Recipe creatRecipe(Recipe recipe, User user);

    public Recipe findRecipeById(Long id) throws Exception;
    
    public void deleteRecipeById(Long id) throws Exception;

    public Recipe updateRecipe(Recipe recipe, Long id) throws Exception;

    public List<Recipe> findAllRecipes();

    public Recipe likRecipe(Long recipeId, User user) throws Exception;
}
