import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = '/api/bookings';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBooking(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  uploadDocuments(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/documents`, formData);
  }
}