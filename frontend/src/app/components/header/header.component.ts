import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  standalone: true
})
export class HeaderComponent implements OnInit {
  currentYear = new Date().getFullYear();
  activeAccount: any = null;
  readonly = false;
  accounts: any[] = [];

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });

    this.accountService.getActiveAccount().subscribe(account => {
      this.activeAccount = account;
    });
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
      this.activeAccount = account;
    });
  }
}
