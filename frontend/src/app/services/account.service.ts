import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = '/api/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getActiveAccount(): Observable<any> {
    // This would typically return the currently active account
    // For now, we'll return the first account
    return new Observable(observer => {
      this.getAccounts().subscribe(accounts => {
        if (accounts.length > 0) {
          observer.next(accounts[0]);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  setActiveAccount(id: number): Observable<any> {
    // This would set the active account
    // For now, we'll just return an observable
    return new Observable(observer => {
      observer.next({ success: true });
      observer.complete();
    });
  }
}