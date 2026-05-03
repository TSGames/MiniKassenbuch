import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { CategoryService } from '../../services/category.service';
import { AccountService } from '../../services/account.service';
import { CurrencyService } from '../../services/currency.service';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule
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
  color: string | null = null;
  categories: any[] = [];
  selectedCategory: number | null = null;
  documents: any[] = [];
  error: string | null = null;
  readonly = false;
  previousId: number | null = null;
  nextId: number | null = null;
  isLoading = true;
  uploadedFiles: File[] = [];

  get activeAccount() {
    return this.accountService.activeAccount;
  }

  readonly colors = [
    { value: 'red', label: 'Rot', hex: '#FF6B6B' },
    { value: 'blue', label: 'Blau', hex: '#4ECDC4' },
    { value: 'green', label: 'Grün', hex: '#95E1D3' },
    { value: 'yellow', label: 'Gelb', hex: '#FFE66D' },
    { value: 'purple', label: 'Lila', hex: '#A8E6CF' },
    { value: 'orange', label: 'Orange', hex: '#FF8B94' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    public currencyService: CurrencyService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadCategories();
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
          this.color = data.color || null;
          this.selectedCategory = data.category ? parseInt(data.category) : null;
          this.documents = data.documents || [];
          this.previousId = data.previousId || null;
          this.nextId = data.nextId || null;
          this.isLoading = false;
          this.cdr.markForCheck();
          console.log('Booking loaded, category:', this.selectedCategory);
        },
        error: (err) => {
          console.error('Error loading booking:', err);
          this.error = 'Fehler beim Laden der Buchung';
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data || [];
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

  guessCategory(label: string): void {
    const combined = `${(label || '')} ${this.notes || ''}`.trim();
    if (!combined || this.selectedCategory) {
      return;
    }

    const splitted = combined.split(' ');
    let matched: any = null;

    // First, try to match against keywords (if defined)
    for (const category of this.categories) {
      if (category.keywords) {
        const keywords = category.keywords.split(',').map((k: string) => k.trim().toLowerCase());
        for (const keyword of keywords) {
          if (keyword && combined.toLowerCase().includes(keyword)) {
            matched = category;
            break;
          }
        }
      }
      if (matched) break;
    }

    // If no keyword match, fall back to word matching against label and notes
    if (!matched) {
      for (const category of this.categories) {
        for (const word of splitted) {
          if (word.length > 3) {
            const search = word.substring(0, Math.round(word.length * 0.8)).toLowerCase();
            if (category.label.toLowerCase().indexOf(search) !== -1) {
              matched = category;
              break;
            }
          }
        }
        if (matched) break;
      }
    }

    if (matched) {
      this.selectedCategory = matched.id;
      this.loadCategory(matched);
    }
  }

  loadCategory(category: any): void {
    if (category.amount && this.amount === 0) {
      this.amount = Math.abs(category.amount);
      this.type = category.amount >= 0 ? '0' : '1';
    }
  }

  clearCategorySelection(): void {
    this.selectedCategory = null;
  }

  getDocumentUrl(documentId: number): string {
    return `/api/documents/${documentId}`;
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
    console.log('onSubmit called');
    if (!this.validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, saving booking');
    this.isLoading = true;
    this.cdr.markForCheck();

    const bookingData = {
      label: this.label,
      date: this.date,
      amount: this.amount,
      type: parseInt(this.type),
      notes: this.notes,
      color: this.color,
      category: this.selectedCategory,
      account: this.activeAccount()?.id
    };

    if (this.id) {
      this.bookingService.updateBooking(this.id, bookingData).subscribe({
        next: () => {
          this.handleBookingSaved(this.id!);
        },
        error: (err) => {
          console.error('Error updating booking:', err);
          this.isLoading = false;
          this.cdr.markForCheck();
          this.snackBar.open('Fehler beim Speichern der Buchung', 'Schließen', { duration: 4000 });
        }
      });
    } else {
      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          this.handleBookingSaved(response.id);
        },
        error: (err) => {
          console.error('Error creating booking:', err);
          this.isLoading = false;
          this.cdr.markForCheck();
          this.snackBar.open('Fehler beim Erstellen der Buchung', 'Schließen', { duration: 4000 });
        }
      });
    }
  }

  validateForm(): boolean {
    this.error = null;

    if (!this.date) {
      const msg = 'Bitte Datum angeben';
      this.snackBar.open(msg, 'Schließen', { duration: 4000 });
      return false;
    }
    if (this.amount === 0 || this.amount === null) {
      const msg = 'Bitte Betrag angeben';
      this.snackBar.open(msg, 'Schließen', { duration: 4000 });
      return false;
    }
    if (!this.selectedCategory) {
      const msg = 'Bitte eine Kategorie festlegen';
      this.snackBar.open(msg, 'Schließen', { duration: 4000 });
      return false;
    }
    return true;
  }

  private handleBookingSaved(bookingId: number): void {
    if (this.uploadedFiles.length === 0) {
      // No files to upload, just finish
      this.finishBookingSave();
    } else {
      // Upload files
      this.uploadFiles(bookingId);
    }
  }

  private uploadFiles(bookingId: number): void {
    const formData = new FormData();
    for (const file of this.uploadedFiles) {
      formData.append('documents', file, file.name);
    }

    this.bookingService.uploadDocuments(bookingId, formData).subscribe({
      next: () => {
        console.log('Files uploaded successfully');
        this.snackBar.open('Dateien hochgeladen', 'OK', { duration: 3000 });
        this.finishBookingSave();
      },
      error: (err) => {
        console.error('Error uploading documents:', err);
        // Still navigate even if upload fails
        this.snackBar.open('Buchung gespeichert, aber Fehler beim Hochladen der Dateien', 'OK', { duration: 4000 });
        this.finishBookingSave();
      }
    });
  }

  private finishBookingSave(): void {
    this.error = null;
    this.isLoading = false;
    this.cdr.markForCheck();
    this.router.navigate(['/']);
  }
}