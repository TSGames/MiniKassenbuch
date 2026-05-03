import { Component, signal, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CurrencyService } from '../../services/currency.service';
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
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatInputModule,
    MatTooltipModule
  ],
  standalone: true
})
export class CategoriesComponent implements OnInit {
  categories = signal<any[]>([]);
  newCategoryName = signal('');
  readonly = signal(false);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    public currencyService: CurrencyService
  ) {
    this.readonly.set(this.authService.isReadOnly());
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data || []);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Fehler beim Laden der Kategorien');
        this.isLoading.set(false);
      }
    });
  }

  onAddCategory(): void {
    const name = this.newCategoryName().trim();
    if (!name || this.readonly()) {
      return;
    }

    this.categoryService.addCategory({ category: name }).subscribe({
      next: () => {
        this.newCategoryName.set('');
        this.error.set(null);
        this.loadCategories();
      },
      error: () => {
        this.error.set('Fehler beim Erstellen der Kategorie');
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount / 100);
  }

  getCategoryType(amount: number | null): string {
    if (!amount) return '-';
    return amount > 0 ? 'Einnahme' : 'Ausgabe';
  }

  getCategoryColor(amount: number | null): string {
    if (!amount) return '';
    return amount > 0 ? 'income' : 'expense';
  }
}