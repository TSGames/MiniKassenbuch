import { Component, signal } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [
    FormsModule,
    DecimalPipe,
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  standalone: true
})
export class CategoriesComponent {
  categories = signal<any[]>([]);
  newCategoryName = signal('');
  currency = '€';
  readonly = signal(false);

  constructor(private categoryService: CategoryService, private authService: AuthService) {
    this.readonly.set(this.authService.isReadOnly());
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data)
    });
  }

  onAddCategory(): void {
    const name = this.newCategoryName();
    if (!name.trim() || this.readonly()) {
      return;
    }

    this.categoryService.addCategory({ category: name.trim() }).subscribe({
      next: () => {
        this.newCategoryName.set('');
        this.loadCategories();
      }
    });
  }
}