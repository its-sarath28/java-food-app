import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeServiceService } from '../../services/recipe/recipe-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class CreateRecipeFormComponent {
  recipeItem: any = {
    title: '',
    description: '',
    image: '',
    vegetarian: '',
  };

  constructor(
    private recipeService: RecipeServiceService,
    private dialogRef: MatDialogRef<CreateRecipeFormComponent>
  ) {}

  onSubmit() {
    // console.log('values', this.recipeItem);
    this.recipeService.createRecipe(this.recipeItem).subscribe({
      next: (data) => {
        console.log('created', data);
        this.dialogRef.close();
      },
      error: (error) => console.log('error', error),
    });
  }
}
