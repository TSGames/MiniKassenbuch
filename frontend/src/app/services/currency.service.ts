import { Injectable, signal } from '@angular/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency = signal<string>('€');

  constructor(private settingsService: SettingsService) {
    this.loadCurrency();
  }

  private loadCurrency(): void {
    this.settingsService.getSettings().subscribe({
      next: (data: any) => {
        const currency = data?.settings?.currency || '€';
        this.currency.set(currency);
      },
      error: (err) => {
        console.error('Failed to load currency settings:', err);
      }
    });
  }

  updateCurrency(currency: string): void {
    this.currency.set(currency);
  }
}
