import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  private baseURL = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(`${this.baseURL}/api/recipes`, { headers }).pipe(
      tap((recipes: any) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({
          ...currentState,
          recipes,
        });
      })
    );
  }

  createRecipe(recipeData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .post(`${this.baseURL}/api/recipes/create-recipe`, recipeData, {
        headers,
      })
      .pipe(
        tap((newRecipe: any) => {
          const currentState = this.recipeSubject.value;
          this.recipeSubject.next({
            ...currentState,
            recipes: [newRecipe, ...currentState.recipes],
          });
        })
      );
  }

  updateRecipe(recipeData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .put(
        `${this.baseURL}/api/recipes/update-recipe/${recipeData.id}`,
        recipeData,
        { headers }
      )
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) => {
            item.id === updatedRecipe.id ? updatedRecipe : item;
          });
          this.recipeSubject.next({
            ...currentState,
            recipes: updatedRecipes,
          });
        })
      );
  }

  likeRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .put(`${this.baseURL}/api/recipes/${id}/like`, { headers })
      .pipe(
        tap((updatedRecipe: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) => {
            item.id === updatedRecipe.id ? updatedRecipe : item;
          });
          this.recipeSubject.next({
            ...currentState,
            recipes: updatedRecipes,
          });
        })
      );
  }

  deleteRecipe(id: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http
      .delete(`${this.baseURL}/api/recipes/delete-recipe/${id}`, { headers })
      .pipe(
        tap((id: any) => {
          const currentState = this.recipeSubject.value;
          const restRecipes = currentState.recipes.filter((item: any) => {
            item.id !== id;
          });
          this.recipeSubject.next({
            ...currentState,
            recipes: restRecipes,
          });
        })
      );
  }
}
