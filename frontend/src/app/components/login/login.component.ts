import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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