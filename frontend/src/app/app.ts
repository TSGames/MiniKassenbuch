import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mini-kassenbuch');
  protected readonly showHeader = signal(true);

  constructor(private authService: AuthService, private router: Router) {
    this.showHeader.set(!this.router.url.startsWith('/login'));
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader.set(!event.urlAfterRedirects.startsWith('/login'));
      }
    });
  }
}