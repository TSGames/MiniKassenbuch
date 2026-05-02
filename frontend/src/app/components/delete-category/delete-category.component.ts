import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule, HeaderComponent],
  standalone: true
})
export class DeleteCategoryComponent implements OnInit {
  id = signal<number | null>(null);
  label = signal('');
  count = signal(0);

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

  loadCategory(): void {
    const id = this.id();
    if (id !== null) {
      this.categoryService.getCategory(id).subscribe({
        next: (data) => {
          this.label.set(data.label);
          this.count.set(data.count);
        }
      });
    }
  }

  onSubmit(): void {
    const id = this.id();
    if (id !== null) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.router.navigate(['/categories'])
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}