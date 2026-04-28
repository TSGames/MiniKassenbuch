import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImportService } from '../../services/import.service';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
  imports: [FormsModule, HeaderComponent],
  standalone: true
})
export class ImportComponent implements OnInit {
  csvSeparator = ';';
  activeAccount: any = null;
  readonly = false;
  
  csvContent: string | null = null;
  previewData: any[] = [];
  headers: string[] = [];
  mappings: any = {};
  showFileSelect = true;
  showConfig = false;
  showConfirm = true;
  showStart = false;

  constructor(
    private router: Router,
    private importService: ImportService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadActiveAccount();
  }

  loadActiveAccount(): void {
    this.accountService.getActiveAccount().subscribe({
      next: (data) => {
        this.activeAccount = data;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.csvContent = e.target.result;
        this.updatePreview();
        this.showFileSelect = false;
        this.showConfig = true;
      };
      reader.readAsText(file);
    }
  }

  updatePreview(): void {
    if (this.csvContent) {
      const config = {
        separator: this.csvSeparator,
        mappings: this.mappings
      };

      this.importService.previewImport(this.csvContent, config).subscribe({
        next: (response: { bookings: any[]; headers: string[] }) => {
          this.previewData = response.bookings;
          this.headers = response.headers;
          // In a real implementation, we would populate the preview table here
        }
      });
    }
  }

  storeConfig(): void {
    // This would store the configuration
    // For now, we'll just log it
    console.log('Storing config:', {
      separator: this.csvSeparator,
      mappings: this.mappings
    });
  }

  confirmImport(): void {
    this.showConfirm = false;
    this.showStart = true;
  }

  doImport(): void {
    if (this.csvContent) {
      const config = {
        separator: this.csvSeparator,
        mappings: this.mappings
      };

      this.importService.startImport(this.csvContent, config).subscribe({
        next: (response: { bookings: any[] }) => {
          const done = response.bookings.filter((b: any) => !b['_invalid'] && !b['_duplicate']).length;
          this.router.navigate(['/import-done'], { 
            queryParams: { imported: done, skipped: response.bookings.length - done }
          });
        }
      });
    }
  }
}
