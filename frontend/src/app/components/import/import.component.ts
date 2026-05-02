import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ImportService } from '../../services/import.service';
import { AccountService } from '../../services/account.service';
import { SettingsService } from '../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface ImportConfig {
  separator: string;
  mappings: { [key: string]: string };
}

interface ImportResponse {
  bookings: any[];
  headers?: string[];
}

enum ImportStep {
  FileSelect,
  Config,
  Preview,
  Confirm,
  Complete
}

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatStepperModule,
    MatProgressBarModule
  ],
  standalone: true
})
export class ImportComponent implements OnInit {
  // State management
  currentStep = signal<ImportStep>(ImportStep.FileSelect);
  csvSeparator = signal(';');
  csvContent = signal<string | null>(null);
  previewData = signal<any[]>([]);
  headers = signal<string[]>([]);
  mappings = signal<{ [key: string]: string }>({});
  isLoading = signal(false);
  error = signal<string | null>(null);

  activeAccount = signal<any>(null);
  currency = signal('€');
  readonly = signal(false);

  // Computed properties
  ImportStep = ImportStep;
  displayedColumns = computed(() => {
    const cols = this.headers().length > 0 ? this.headers() : [];
    return ['status', ...cols];
  });

  hasInvalidRows = computed(() =>
    this.previewData().some((row: any) => row._invalid || row._duplicate)
  );

  validRowCount = computed(() =>
    this.previewData().filter((row: any) => !row._invalid && !row._duplicate).length
  );

  constructor(
    private router: Router,
    private importService: ImportService,
    private accountService: AccountService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.loadSettings();
    this.loadActiveAccount();
  }

  private loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.currency.set(settings.currency || '€');
      }
    });
  }

  private loadActiveAccount(): void {
    this.accountService.loadActiveAccount().subscribe();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file
    if (!file.name.endsWith('.csv')) {
      this.error.set('Bitte wählen Sie eine CSV-Datei aus');
      return;
    }

    this.error.set(null);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      this.csvContent.set(content);
      this.currentStep.set(ImportStep.Config);
      this.updatePreview();
    };

    reader.onerror = () => {
      this.error.set('Fehler beim Lesen der Datei');
    };

    reader.readAsText(file);
  }

  updatePreview(): void {
    const content = this.csvContent();
    if (!content) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const config: ImportConfig = {
      separator: this.csvSeparator(),
      mappings: this.mappings()
    };

    this.importService.previewImport(content, config).subscribe({
      next: (response: ImportResponse) => {
        this.previewData.set(response.bookings || []);
        this.headers.set(response.headers || []);
        this.currentStep.set(ImportStep.Preview);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Fehler beim Vorschau: ' + (err.error?.message || 'Unbekannter Fehler'));
        this.isLoading.set(false);
      }
    });
  }

  confirmImport(): void {
    if (this.hasInvalidRows()) {
      this.error.set('Bitte beheben Sie die Fehler in der Vorschau');
      return;
    }
    this.currentStep.set(ImportStep.Confirm);
  }

  doImport(): void {
    const content = this.csvContent();
    if (!content) {
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const config: ImportConfig = {
      separator: this.csvSeparator(),
      mappings: this.mappings()
    };

    this.importService.startImport(content, config).subscribe({
      next: (response: ImportResponse) => {
        this.isLoading.set(false);
        const done = this.validRowCount();
        const skipped = (response.bookings?.length || 0) - done;

        this.router.navigate(['/import-done'], {
          queryParams: { imported: done, skipped: skipped }
        });
      },
      error: (err) => {
        this.error.set('Fehler beim Import: ' + (err.error?.message || 'Unbekannter Fehler'));
        this.isLoading.set(false);
      }
    });
  }

  goBack(): void {
    this.currentStep.set(ImportStep.FileSelect);
    this.csvContent.set(null);
    this.previewData.set([]);
    this.headers.set([]);
    this.error.set(null);
  }

  goToPreview(): void {
    this.currentStep.set(ImportStep.Preview);
  }

  getRowStatus(row: any): string {
    if (row._invalid) return 'invalid';
    if (row._duplicate) return 'duplicate';
    return 'valid';
  }

  getRowStatusIcon(status: string): string {
    switch (status) {
      case 'valid':
        return 'check_circle';
      case 'invalid':
        return 'error';
      case 'duplicate':
        return 'warning';
      default:
        return 'help';
    }
  }
}
