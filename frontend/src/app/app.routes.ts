import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BookingComponent } from './components/booking/booking.component';
import { DeleteComponent } from './components/delete/delete.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { ImportComponent } from './components/import/import.component';
import { ImportDoneComponent } from './components/import-done/import-done.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ListComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'add', component: BookingComponent },
      { path: 'edit/:id', component: BookingComponent },
      { path: 'delete/:id', component: DeleteComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent },
      { path: 'delete-category/:id', component: DeleteCategoryComponent },
      { path: 'import', component: ImportComponent },
      { path: 'import-done', component: ImportDoneComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];