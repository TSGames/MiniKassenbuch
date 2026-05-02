import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { SettingsService } from '../../services/settings.service';
import { DecimalPipe, CommonModule, KeyValuePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

declare var google: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [
    DecimalPipe,
    KeyValuePipe,
    CommonModule,
    HeaderComponent,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  standalone: true
})
export class ReportsComponent implements OnInit {
  @ViewChild('yearlyChart') yearlyChartRef!: ElementRef;
  @ViewChild('monthlyChart') monthlyChartRef!: ElementRef;

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

  constructor(
    private reportService: ReportService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.loadSettings();
    this.loadChartsLibrary();
  }

  private loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.currency = settings.currency || '€';
      }
    });
  }

  private loadChartsLibrary(): void {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.async = true;
      script.onload = () => {
        google.charts.load('current', { packages: ['corechart', 'table'] });
        google.charts.setOnLoadCallback(() => this.loadReports());
      };
      document.head.appendChild(script);
    } else {
      this.loadReports();
    }
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

        // Draw charts after data is loaded
        setTimeout(() => {
          this.drawYearlyChart();
          this.drawMonthlyChart();
        }, 0);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  private drawYearlyChart(): void {
    if (!this.yearlyChartRef || !this.yearsStats.length) return;

    const dataArray: any[] = [['Jahr', 'Einnahmen', 'Ausgaben']];

    Object.entries(this.yearsStats).forEach(([year, data]: [string, any]) => {
      dataArray.push([
        year,
        data[0] ? data[0] / 100 : 0,
        data[1] ? data[1] / 100 : 0
      ]);
    });

    const data = google.visualization.arrayToDataTable(dataArray);

    const options = {
      title: 'Jahresübersicht Ein-/Ausgaben',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: {
        title: 'Jahr'
      },
      vAxis: {
        title: `Betrag (${this.currency})`
      },
      pointSize: 7,
      series: {
        0: { color: '#4caf50' },
        1: { color: '#f44336' }
      }
    };

    const chart = new google.visualization.ColumnChart(this.yearlyChartRef.nativeElement);
    chart.draw(data, options);
  }

  private drawMonthlyChart(): void {
    if (!this.monthlyChartRef || !this.monthsStats.length) return;

    const dataArray: any[] = [['Monat', 'Einnahmen', 'Ausgaben']];

    this.monthsStats.forEach((month: any) => {
      dataArray.push([
        month.label,
        month[0] ? month[0] / 100 : 0,
        month[1] ? month[1] / 100 : 0
      ]);
    });

    const data = google.visualization.arrayToDataTable(dataArray);

    const options = {
      title: 'Monatsübersicht Ein-/Ausgaben',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: {
        title: 'Monat'
      },
      vAxis: {
        title: `Betrag (${this.currency})`
      },
      pointSize: 7,
      series: {
        0: { color: '#4caf50' },
        1: { color: '#f44336' }
      }
    };

    const chart = new google.visualization.ColumnChart(this.monthlyChartRef.nativeElement);
    chart.draw(data, options);
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
