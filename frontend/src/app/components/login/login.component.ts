import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  credentials = {
    user: '',
    password: ''
  };
  firstTime = signal(false) as WritableSignal<boolean>;
  valid = signal(null) as WritableSignal<boolean | null>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe({
      next: (response) => {
        this.firstTime.set(response.firstTime);
      },
      error: (error) => {
        console.error('Unable to determine login status:', error);
      }
    });
  }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.success) {
          this.firstTime.set(!!response.firstTime);
          this.router.navigate(['/']);
        } else {
          this.valid.set(false);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.valid.set(false);
      }
    });
  }
}