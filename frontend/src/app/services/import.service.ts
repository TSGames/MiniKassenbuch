import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ImportConfig {
  separator: string;
  mappings: { [key: string]: string };
  autoDetectCategory?: boolean;
}

interface ImportRequest {
  csv: string;
  config: ImportConfig;
}

interface ImportBooking {
  [key: string]: any;
  _invalid?: boolean;
  _duplicate?: boolean;
}

interface ImportResponse {
  bookings: ImportBooking[];
  headers?: string[];
  imported?: number;
  skipped?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private readonly apiUrl = '/api/import';

  constructor(private http: HttpClient) {}

  previewImport(csv: string, config: ImportConfig): Observable<ImportResponse> {
    const payload: ImportRequest = { csv, config };
    return this.http.post<ImportResponse>(`${this.apiUrl}/preview`, payload);
  }

  startImport(csv: string, config: ImportConfig): Observable<ImportResponse> {
    const payload: ImportRequest = { csv, config };
    return this.http.post<ImportResponse>(`${this.apiUrl}/start`, payload);
  }
}