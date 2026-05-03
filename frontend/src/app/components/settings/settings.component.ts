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

  constructor(private settingsService: SettingsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (data: any) => {
        this.stats = data.stats;
        this.currency = data.settings.currency || '€';
        this.readOnlyEnabled = data.settings.readOnlyEnabled || false;
        this.readOnlyUsername = data.settings.readOnlyUsername || '';
      }
    });
  }

  downloadBackup(): void {
    this.http.get('/api/backup', { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup-${new Date().toISOString().split('T')[0]}.zip`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Backup download failed:', error);
        this.error = 'Fehler beim Herunterladen des Backups';
      }
    });
  }

  onSubmit(): void {
    const settingsData = {
      currency: this.currency,
      readOnlyEnabled: this.readOnlyEnabled,
      readOnlyUsername: this.readOnlyUsername,
      readOnlyPassword: this.readOnlyPassword
    };

    this.settingsService.updateSettings(settingsData).subscribe({
      next: () => {
        // Success handling
        console.log('Settings saved successfully');
      },
      error: (error: unknown) => {
        this.error = 'Fehler beim Speichern der Einstellungen';
        console.error('Settings save error:', error);
      }
    });
  }

  toggleReadOnlyUser(): void {
    // This is handled by the template binding
  }
}
