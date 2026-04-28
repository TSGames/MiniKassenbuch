import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private apiUrl = '/api/import';

  constructor(private http: HttpClient) { }

  previewImport(csv: string, config: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/preview`, { csv, config });
  }

  startImport(csv: string, config: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/start`, { csv, config });
  }
}