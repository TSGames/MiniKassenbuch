import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { SettingsService } from '../../services/settings.service';
import { DecimalPipe, CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [DecimalPipe, CommonModule, HeaderComponent],
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

  constructor(
    private reportService: ReportService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.loadSettings();
    this.loadReports();
  }

  private loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.currency = settings.currency || '€';
      }
    });
  }

  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (data) => {
        this.yearsStats = data.years;
        this.yearsAccountStats = data.yearsAccount;
        this.monthsStats = data.months;
        this.tops = data.tops;
        this.categories = data.categories;
        this.categoriesMissing = data.categoriesMissing;
        this.yearStats = data.yearStats;
      }
    });
  }
}
