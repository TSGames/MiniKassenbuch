import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';
  darkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      this.applyTheme(isDark);
      localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    });
  }

  private getInitialTheme(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }

  toggleTheme(): void {
    this.darkMode.set(!this.darkMode());
  }
}
