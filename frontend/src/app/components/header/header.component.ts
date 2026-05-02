import { Component, OnInit, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSnackBarModule],
  standalone: true
})
export class HeaderComponent implements OnInit {
  currentYear = new Date().getFullYear();
  readonly activeAccount: WritableSignal<any>;
  readonly = false;
  accounts: any[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    public themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {
    this.activeAccount = this.accountService.activeAccount;
  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
      if (!this.activeAccount()) {
        this.accountService.activeAccount.set(accounts[0] ?? null);
      }
    });

    this.accountService.loadActiveAccount().subscribe();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  selectAccount(id: number): void {
    const account = this.accounts.find(acc => acc.id === id);
    if (!account) {
      return;
    }

    this.accountService.setActiveAccount(id).subscribe(() => {
      window.location.reload();
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    if (this.themeService.darkMode()) {
      this.snackBar.open('Dunkelmodus befindet sich noch in der Beta-Phase.', 'OK', {
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom'
      });
    }
  }
}
