import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: 'gastos', component: ExpenseListComponent },
  { path: 'gastos/nuevo', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
