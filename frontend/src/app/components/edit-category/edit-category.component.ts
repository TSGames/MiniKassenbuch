import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  imports: [FormsModule, HeaderComponent],
  standalone: true
})
export class EditCategoryComponent implements OnInit {
  id = signal<number | null>(null);
  label = signal('');
  amount = signal(0);
  type = signal(0);
  currency = '€';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id.set(+params['id']);
        this.loadCategory();
      }
    });
  }

  private loadCategory(): void {
    const id = this.id();
    if (id !== null) {
      this.categoryService.getCategory(id).subscribe({
        next: (data) => {
          this.label.set(data.label);
          this.amount.set(Math.abs(data.amount));
          this.type.set(data.amount >= 0 ? 0 : 1);
        }
      });
    }
  }

  onSubmit(): void {
    const id = this.id();
    if (id === null) {
      return;
    }

    const categoryData = {
      id,
      label: this.label(),
      amount: this.type() === 0 ? this.amount() : -this.amount()
    };

    this.categoryService.updateCategory(id, categoryData).subscribe({
      next: () => this.router.navigate(['/categories'])
    });
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}