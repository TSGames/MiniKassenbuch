import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AccountService } from '../../services/account.service';
import { SettingsService } from '../../services/settings.service';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [
    DatePipe,
    DecimalPipe,
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatTooltipModule
  ],
  standalone: true
})
export class ListComponent implements OnInit {
  bookings: any[] = [];
  filterYear = new Date().getFullYear();
  filterMonth = 0;
  yearRange: number[] = [];
  monthLabels: string[] = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  currency = '€';
  readonly = false;
  isLoading = true;

  constructor(
    private bookingService: BookingService,
    private accountService: AccountService,
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.generateYearRange();
    this.loadSettings();
    this.loadBookings();
  }

  generateYearRange(): void {
    const currentYear = new Date().getFullYear();
    this.yearRange = Array.from({length: 41}, (_, i) => currentYear - 20 + i);
  }

  loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.currency = settings.currency || '€';
      }
    });
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.bookings = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  setFilter(): void {
    this.loadBookings();
  }

  getMonthLabel(monthIndex: number): string {
    return this.monthLabels[monthIndex] || 'Gesamtes Jahr';
  }

  deleteBooking(id: number): void {
    if (confirm('Buchung wirklich löschen?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.loadBookings();
        }
      });
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount / 100);
  }
}