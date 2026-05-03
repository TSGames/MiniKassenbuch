import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { CurrencyService } from '../../services/currency.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    FormsModule,
    DecimalPipe,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  standalone: true
})
export class SettingsComponent implements OnInit {
  stats: any = null;
  currency = '€';
  readOnlyEnabled = false;
  readOnlyUsername = '';
  readOnlyPassword = '';
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private settingsService: SettingsService, private currencyService: CurrencyService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (data: any) => {
        this.stats = data.stats;
        this.currency = data.settings.currency || '€';
        this.currencyService.updateCurrency(this.currency);
        const ro = data.settings.readOnlyEnabled;
        this.readOnlyEnabled = ro === true || ro === 'true' || ro === '1';
        this.readOnlyUsername = data.settings.readOnlyUsername || '';
        this.cdr.markForCheck();
      }
    });
  }

  downloadBackup(): void {
    window.location.href = '/api/backup';
  }

  onSubmit(): void {
    this.error = null;
    this.successMessage = null;
    const settingsData = {
      currency: this.currency,
      readOnlyEnabled: this.readOnlyEnabled,
      readOnlyUsername: this.readOnlyUsername,
      readOnlyPassword: this.readOnlyPassword
    };

    this.settingsService.updateSettings(settingsData).subscribe({
      next: () => {
        this.currencyService.updateCurrency(this.currency);
        this.successMessage = 'Einstellungen gespeichert';
        setTimeout(() => { this.successMessage = null; }, 3000);
      },
      error: (err: unknown) => {
        this.error = 'Fehler beim Speichern der Einstellungen';
        console.error('Settings save error:', err);
      }
    });
  }

  toggleReadOnlyUser(): void { }
}
