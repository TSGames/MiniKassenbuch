import { Component, OnInit, ChangeDetectorRef, effect } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AccountService } from '../../services/account.service';
import { CurrencyService } from '../../services/currency.service';
import { FilterService } from '../../services/filter.service';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

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
  readonly = false;
  isLoading = true;

  constructor(
    private bookingService: BookingService,
    private accountService: AccountService,
    public currencyService: CurrencyService,
    public filterService: FilterService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    effect(() => {
      // React to filter changes from the header
      this.filterService.filterYear();
      this.filterService.filterMonth();
      this.loadBookings();
    });
  }

  ngOnInit(): void {
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

  deleteBooking(id: number): void {
    if (confirm('Buchung wirklich löschen?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          this.loadBookings();
        }
      });
    }
  }

  onFilterChange(year: number, month: number): void {
    this.filterService.setFilter(year, month);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount / 100);
  }

  exportData(): void {
    window.location.href = '/api/export';
  }

  editBooking(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}
