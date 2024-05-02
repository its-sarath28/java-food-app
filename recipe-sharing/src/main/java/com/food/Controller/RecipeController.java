package com.food.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food.Model.Recipe;
import com.food.Model.User;
import com.food.Service.RecipeService;
import com.food.Service.UserService;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;

    @PostMapping("/create-recipe")
    public Recipe createRecipe(@RequestBody Recipe recipe,@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Recipe createRecipe = recipeService.creatRecipe(recipe, user);

        return createRecipe;
    }
   
    @GetMapping()
    public List<Recipe> getAllRecipes() throws Exception {

        List<Recipe> allRecipes = recipeService.findAllRecipes();

        return allRecipes;
    }
   
    @DeleteMapping("/delete-recipe/{recipeId}")
    public String deleteRecipe(@PathVariable Long recipeId) throws Exception {

        recipeService.deleteRecipeById(recipeId);

        return "Recipe deleted successfully";
    }
    
    @PutMapping("/update-recipe/{id}")
    public Recipe updateRecipe(@RequestBody Recipe recipe, @PathVariable Long id) throws Exception {

        Recipe updatedRecipe = recipeService.updateRecipe(recipe, id);

        return updatedRecipe;
    }
   
    @PutMapping("/{id}/like")
    public Recipe likeRecipe(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Recipe updatedRecipe = recipeService.likRecipe(id, user);

        return updatedRecipe;
    }
}
