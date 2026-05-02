import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CategoryService } from '../../services/category.service';
import { AccountService } from '../../services/account.service';
import { SettingsService } from '../../services/settings.service';
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
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  standalone: true
})
export class BookingComponent implements OnInit {
  id: number | null = null;
  label = '';
  date = '';
  amount = 0;
  type = '0';
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
  isLoading = true;
  uploadedFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadCategories();
    this.loadSettings();
    this.loadActiveAccount();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.loadBooking();
      } else {
        this.isLoading = false;
        this.setDefaultDate();
      }
    });
  }

  loadBooking(): void {
    if (this.id) {
      this.bookingService.getBooking(this.id).subscribe({
        next: (data) => {
          this.label = data.label || '';
          this.date = data.date || '';
          this.amount = data.amount || 0;
          this.type = String(data.type || 0);
          this.notes = data.notes || '';
          this.selectedCategory = data.category || null;
          this.documents = data.documents || [];
          this.previousId = data.previousId || null;
          this.nextId = data.nextId || null;
          this.isLoading = false;
        },
        error: () => {
          this.error = 'Fehler beim Laden der Buchung';
          this.isLoading = false;
        }
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
      }
    });
  }

  loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.currency = settings.currency || '€';
      }
    });
  }

  loadActiveAccount(): void {
    this.accountService.loadActiveAccount().subscribe();
  }

  setDefaultDate(): void {
    const today = new Date();
    this.date = today.toISOString().split('T')[0];
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
    if (this.id && confirm('Dokument wirklich löschen?')) {
      // Remove from UI
      this.documents = this.documents.filter(d => d.id !== documentId);
      // TODO: Implement API call to delete document
    }
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadedFiles = Array.from(files);
    }
  }

  getUploadedFileNames(): string {
    return this.uploadedFiles.map(f => f.name).join(', ');
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const bookingData = {
      label: this.label,
      date: this.date,
      amount: this.amount,
      type: parseInt(this.type),
      notes: this.notes,
      category: this.selectedCategory,
      account: this.activeAccount()?.id
    };

    if (this.id) {
      this.bookingService.updateBooking(this.id, bookingData).subscribe({
        next: () => {
          this.error = null;
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = 'Fehler beim Speichern der Buchung';
        }
      });
    } else {
      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          this.error = null;
          this.router.navigate(['/edit', response.id]);
        },
        error: () => {
          this.error = 'Fehler beim Erstellen der Buchung';
        }
      });
    }
  }

  validateForm(): boolean {
    this.error = null;

    if (!this.date) {
      this.error = 'Bitte Datum angeben';
      return false;
    }
    if (this.amount === 0 || this.amount === null) {
      this.error = 'Bitte Betrag angeben';
      return false;
    }
    if (!this.selectedCategory) {
      this.error = 'Bitte eine Kategorie festlegen';
      return false;
    }
    return true;
  }
}