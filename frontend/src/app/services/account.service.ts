import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = '/api/accounts';
  private accountUrl = '/api/account';
  readonly activeAccount: WritableSignal<any> = signal(null);

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  loadActiveAccount(): Observable<any> {
    return this.http.get<any>(this.accountUrl).pipe(
      tap(response => {
        this.activeAccount.set(response.account);
      })
    );
  }

  setActiveAccount(id: number): Observable<any> {
    return this.http.post<any>(this.accountUrl, { id }).pipe(
      tap(() => this.loadActiveAccount().subscribe())
    );
  }
}