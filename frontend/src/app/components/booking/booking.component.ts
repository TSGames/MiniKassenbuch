import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CategoryService } from '../../services/category.service';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  standalone: true
})
export class BookingComponent implements OnInit {
  id: number | null = null;
  label = '';
  date = '';
  amount = 0;
  type = 0;
  notes = '';
  categories: any[] = [];
  selectedCategory: number | null = null;
  documents: any[] = [];
  error: string | null = null;
  activeAccount = signal<any>(null);
  currency = '€';
  readonly = false;
  previousId: number | null = null;
  nextId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private categoryService: CategoryService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.loadBooking();
      } else {
        this.loadCategories();
      }
      this.loadActiveAccount();
    });
  }

  loadBooking(): void {
    if (this.id) {
      this.bookingService.getBooking(this.id).subscribe({
        next: (data) => {
          this.label = data.label;
          this.date = data.date;
          this.amount = data.amount;
          this.type = data.type;
          this.notes = data.notes;
          this.selectedCategory = data.category;
          this.documents = data.documents || [];
          this.previousId = data.previousId;
          this.nextId = data.nextId;
        }
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  loadActiveAccount(): void {
    this.accountService.loadActiveAccount().subscribe();
  }

  guessCategory(event: any): void {
    // This would implement the JavaScript logic from the original template
    // For now, we'll leave it empty as it's complex to replicate
  }

  loadCategory(category: any): void {
    if (category.amount && this.amount === 0) {
      this.amount = Math.abs(category.amount);
      this.type = category.amount >= 0 ? 0 : 1;
    }
  }

  clearCategorySelection(): void {
    this.selectedCategory = null;
  }

  getDocumentUrl(documentId: number): string {
    // This would return the actual document URL
    return `document/${documentId}`;
  }

  deleteDocument(documentId: number): void {
    // This would delete the document
    // For now, we'll leave it empty
  }

  onFileChange(event: any): void {
    // This would handle file uploads
    // For now, we'll leave it empty
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const bookingData = {
      label: this.label,
      date: this.date,
      amount: this.amount,
      type: this.type,
      notes: this.notes,
      category: this.selectedCategory
    };

    if (this.id) {
      this.bookingService.updateBooking(this.id, bookingData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          this.router.navigate(['/edit', response.id]);
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.label) {
      this.error = 'Bitte Bezeichnung angeben';
      return false;
    }
    if (!this.date) {
      this.error = 'Bitte Datum angeben';
      return false;
    }
    if (!this.amount) {
      this.error = 'Bitte Betrag angeben';
      return false;
    }
    if (!this.selectedCategory) {
      this.error = 'Bitte eine Kategorie festlegen';
      return false;
    }
    this.error = null;
    return true;
  }
}