import { Component, OnInit, signal, ChangeDetectorRef, effect } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { SettingsService } from '../../services/settings.service';
import { FilterService } from '../../services/filter.service';
import { DecimalPipe, CommonModule, KeyValuePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ColumnChartComponent } from '../charts/column-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [
    DecimalPipe,
    KeyValuePipe,
    CommonModule,
    HeaderComponent,
    ColumnChartComponent,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  standalone: true
})
export class ReportsComponent implements OnInit {

  currentYear = new Date().getFullYear();
  currency = '€';
  yearsStats: any[] = [];
  yearsAccountStats: any[] = [];
  monthsStats: any[] = [];
  tops: any[] = [[], []];
  categories: any[] = [[], []];
  categoriesMissing = 0;
  yearStats: any[] = [];
  isLoading = signal(true);

  displayedYearColumns: string[] = ['year', 'income', 'expenses', 'result', 'startBalance', 'endBalance'];
  displayedAccountColumns: string[] = ['account', 'income', 'expenses', 'result', 'startBalance', 'endBalance'];
  displayedTopColumns: string[] = ['label', 'amount', 'percentage'];
  displayedCategoryColumns: string[] = ['category', 'amount', 'percentage'];

  yearlyChartData: { [key: string]: [number, number] } = {};
  monthlyChartData: { [key: string]: [number, number] } = {};

  constructor(
    private reportService: ReportService,
    private settingsService: SettingsService,
    private filterService: FilterService,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      this.filterService.filterYear();
      this.filterService.filterMonth();
      this.loadReports();
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.currency = settings.currency || '€';
      }
    });
  }

  loadReports(): void {
    this.isLoading.set(true);
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.yearsStats = data.years;
        this.yearsAccountStats = data.yearsAccount;
        this.monthsStats = data.months;
        this.tops = data.tops;
        this.categories = data.categories;
        this.categoriesMissing = data.categoriesMissing;
        this.yearStats = data.yearStats;
        this.isLoading.set(false);

        // Process chart data
        this.processChartData();
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  private processChartData(): void {
    // Process yearly data for chart
    this.yearlyChartData = {};
    Object.entries(this.yearsStats).forEach(([year, data]: [string, any]) => {
      this.yearlyChartData[year] = [
        data[0] ? data[0] / 100 : 0,
        data[1] ? data[1] / 100 : 0
      ];
    });

    // Process monthly data for chart
    this.monthlyChartData = {};
    this.monthsStats.forEach((month: any, index: number) => {
      const monthLabel = month.label || `Monat ${index + 1}`;
      this.monthlyChartData[monthLabel] = [
        month[0] ? month[0] / 100 : 0,
        month[1] ? month[1] / 100 : 0
      ];
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  calculatePercentage(amount: number, total: number): number {
    if (total === 0) return 0;
    return (amount / total) * 100;
  }

  getYearKey(index: number): string {
    return Object.keys(this.yearsStats)[index] || '';
  }

  getYearValue(index: number): any {
    return Object.values(this.yearsStats)[index] || {};
  }
}
