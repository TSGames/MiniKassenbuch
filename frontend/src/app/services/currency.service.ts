import { Injectable, DestroyRef, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>('€');
  public currency$: Observable<string> = this.currencySubject.asObservable();
  private destroyRef = inject(DestroyRef);

  constructor(private settingsService: SettingsService) {
    this.loadCurrency();
  }

  private loadCurrency(): void {
    this.settingsService.getSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: any) => {
          const currency = data?.settings?.currency || '€';
          this.currencySubject.next(currency);
        },
        error: (err) => {
          console.error('Failed to load currency settings:', err);
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
