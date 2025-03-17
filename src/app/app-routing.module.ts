import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent},
  { path: 'gastos', component: ExpenseListComponent },
  { path: 'gastos/nuevo', component: FormComponent},
  { path: 'gastos/:id/editar', component: FormComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
