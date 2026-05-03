import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>('€');
  public currency$: Observable<string> = this.currencySubject.asObservable();

  constructor(private settingsService: SettingsService) {
    this.loadCurrency();
  }

  private loadCurrency(): void {
    this.settingsService.getSettings().subscribe({
      next: (data: any) => {
        const currency = data.settings?.currency || '€';
        this.currencySubject.next(currency);
      }
    });
  }

  updateCurrency(currency: string): void {
    this.currencySubject.next(currency);
  }

  getCurrency(): string {
    return this.currencySubject.value;
  }
}
