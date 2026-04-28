import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const AUTH_STORAGE_KEY = 'mkb-user';
const READONLY_STORAGE_KEY = 'mkb-readonly';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { user: string, password: string }): Observable<any> {
    return this.http.post<{ success: boolean; user?: string; readonly?: boolean; firstTime?: boolean }>(`${this.apiUrl}/login`, credentials).pipe(
      tap({
        next: (response) => {
          if (response.success && response.user) {
            this.setAuthStorage(response.user, !!response.readonly);
          } else {
            this.clearAuthStorage();
          }
        },
        error: () => this.clearAuthStorage()
      })
    );
  }

  getLoginStatus(): Observable<{ firstTime: boolean }> {
    return this.http.get<{ firstTime: boolean }>(`${this.apiUrl}/login`);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearAuthStorage())
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  }

  isReadOnly(): boolean {
    return localStorage.getItem(READONLY_STORAGE_KEY) === '1';
  }

  private setAuthStorage(user: string, readonly: boolean): void {
    localStorage.setItem(AUTH_STORAGE_KEY, user);
    localStorage.setItem(READONLY_STORAGE_KEY, readonly ? '1' : '0');
  }

  private clearAuthStorage(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(READONLY_STORAGE_KEY);
  }
}