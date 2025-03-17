import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  expenseForm: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    amount: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    expense_date: new FormControl('', Validators.required)
  });
  expenseId?: number;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.loadDataIntoForm();
  }

  saveExpense(): void{
    if(this.expenseId){
      this.expenseService.updateExpense(this.expenseId, this.expenseForm.value).subscribe(expense => {
        this.router.navigateByUrl('/gastos');
      });
    } else {
      this.expenseService.createExpense(this.expenseForm.value).subscribe(expense => {
        this.router.navigateByUrl('/gastos');
      });
    }
  }

  hasError(field: string): boolean{
    const errorsObject = this.expenseForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if(errors.length && (this.expenseForm.get(field)?.touched || this.expenseForm.get(field)?.dirty)){
      return true;
    }
    return false;
  }

  getCurrentError(field: string): string{
    const errorsObject = this.expenseForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);

    if(!errors)
      return '';

    return errors[0];
  }

  getFormTitle(): string{
    return this.expenseId ? 'Editar gasto' : 'Nuevo gasto';
  }

  private loadDataIntoForm(): void{
    this.expenseId = Number(this.route.snapshot.paramMap.get('id'));

    if(this.expenseId){
      this.expenseService.getExpense(this.expenseId).subscribe(expense => {
        this.expenseForm.patchValue(expense);
      });
    }
  }
}
