import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AccountService } from '../../services/account.service';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [DatePipe, DecimalPipe, CommonModule, RouterModule, HeaderComponent, MatCardModule, MatButtonModule, MatIconModule],
  standalone: true
})
export class ListComponent implements OnInit {
  bookings: any[] = [];
  filterYear = new Date().getFullYear();
  filterMonth = new Date().getMonth();
  yearRange: number[] = [];
  months: number[] = [];
  currency = '€';
  readonly = false;

  constructor(private bookingService: BookingService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.generateYearRange();
    this.generateMonths();
    this.loadBookings();
  }

  generateYearRange(): void {
    const currentYear = new Date().getFullYear();
    this.yearRange = Array.from({length: 41}, (_, i) => currentYear - 20 + i);
  }

  generateMonths(): void {
    this.months = Array.from({length: 12}, (_, i) => i);
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      }
    });
  }

  setFilter(): void {
    // This would update the filter and reload data
    // For now, we'll just reload the data
    this.loadBookings();
  }
}