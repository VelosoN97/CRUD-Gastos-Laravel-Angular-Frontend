import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  total: number = 0;

  constructor(
    private expenseService: ExpenseService
  ){}

  ngOnInit(): void {
      this.loadDataIntoTable();
  }

  deleteExpense(id: number): void{
    this.expenseService.deleteExpense(id).subscribe(response => {
      this.expenses = this.expenses.filter(expense => expense.id != id);
      this.calculeTotal();
    });
  }

  private loadDataIntoTable(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.calculeTotal();
    });
  }

  private calculeTotal(): void{
    this.total = this.expenses.reduce((accumulated, currentValue) => {
      return accumulated + Number(currentValue.amount);
    }, 0);
  }
}
