package com.food.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.Model.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    
}
