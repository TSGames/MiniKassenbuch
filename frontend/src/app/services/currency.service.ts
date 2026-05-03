import { Injectable, signal, effect } from '@angular/core';
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
        console.log('CurrencyService: loaded currency from backend:', currency);
        this.currency.set(currency);
      },
      error: (err) => {
        console.error('CurrencyService: failed to load currency:', err);
        this.currency.set('€');
      }
    });
  }

  updateCurrency(currency: string): void {
    console.log('CurrencyService: updating currency to:', currency);
    this.currency.set(currency);
  }
}
