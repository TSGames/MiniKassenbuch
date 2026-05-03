import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../../services/settings.service';
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
  isDownloading = false;

  constructor(private settingsService: SettingsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (data: any) => {
        this.stats = data.stats;
        this.currency = data.settings.currency || '€';
        const ro = data.settings.readOnlyEnabled;
        this.readOnlyEnabled = ro === true || ro === 'true' || ro === '1';
        this.readOnlyUsername = data.settings.readOnlyUsername || '';
      }
    });
  }

  downloadBackup(): void {
    this.isDownloading = true;
    this.error = null;
    this.http.get('/api/backup', { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup-${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
      },
      error: (err) => {
        console.error('Backup download failed:', err);
        this.error = 'Fehler beim Herunterladen des Backups';
        this.isDownloading = false;
      }
    });
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
