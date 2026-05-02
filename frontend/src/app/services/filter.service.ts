import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterYear = signal<number>(new Date().getFullYear());
  filterMonth = signal<number>(0);

  private initialized = false;

  constructor(private http: HttpClient) {}

  load(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.http.get<any>('/api/filter').subscribe({
      next: (filter) => {
        this.filterYear.set(filter.year);
        this.filterMonth.set(filter.month);
      }
    });
  }

  setFilter(year: number, month: number): void {
    this.filterYear.set(year);
    this.filterMonth.set(month);
    this.http.post('/api/filter', { year, month }).subscribe();
  }

  yearRange(): number[] {
    const current = new Date().getFullYear();
    return Array.from({ length: 41 }, (_, i) => current - 20 + i);
  }

  monthLabels = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
                 'August', 'September', 'Oktober', 'November', 'Dezember'];
}
