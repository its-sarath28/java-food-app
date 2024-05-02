import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../create-recipe-form/create-recipe-form.component';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecipeCardComponent, MatButtonModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  recipes = [2, 1, 3, 4, 5, 6];

  constructor(
    public dialog: MatDialog,
    public authService: AuthServiceService
  ) {}

  handleOpenCreateRecipeModal() {
    this.dialog.open(CreateRecipeFormComponent);
  }

  ngOnInit() {
    // console.log('on init');ks
    this.authService.getUserProfile().subscribe();
  }
}
