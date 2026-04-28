import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  imports: [FormsModule, HeaderComponent],
  standalone: true
})
export class DeleteComponent implements OnInit {
  id = signal<number | null>(null);
  label = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id.set(+params['id']);
        this.loadBooking();
      }
    });
  }

  loadBooking(): void {
    const id = this.id();
    if (id !== null) {
      this.bookingService.getBooking(id).subscribe({
        next: (data) => {
          this.label.set(data.label);
        }
      });
    }
  }

  onSubmit(): void {
    const id = this.id();
    if (id !== null) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => this.router.navigate(['/'])
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}