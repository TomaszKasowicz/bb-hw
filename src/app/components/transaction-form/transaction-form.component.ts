import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defer, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Transaction } from '../../model/transaction';
import { TransactionsService } from '../../services/transactions.service';
import { balanceValidator } from './balance.validator';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  public transferForm: FormGroup;
  public isReview: boolean;

  public disabled$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService
  ) {
    this.transferForm = this.fb.group({
      from: this.fb.control({ value: null, disabled: true }),
      to: this.fb.control(null, [Validators.required]),
      amount: this.fb.control(null, [
        Validators.required,
        Validators.min(0),
        balanceValidator(this.transactionService)
      ])
    });
  }

  private resetForm() {
    this.isReview = false;
    this.transferForm.reset({
      from: this.getFromValue(),
      to: null,
      amount: null
    });
    this.transferForm.enable();
    this.transferForm.get('from')?.disable();
    // this.transferForm.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.resetForm();
    this.disabled$ = defer(() => this.transferForm.statusChanges).pipe(
      map(status => status === 'INVALID'),
      startWith(true)
    );
  }

  private getFromValue() {
    return `Free Checking(4962) - $${Number(
      this.transactionService.getCurrentBalance()
    ).toFixed(2)}`;
  }

  toggleState() {
    this.isReview = !this.isReview;
    if (!this.isReview) {
      this.resetForm();
    } else {
      this.transferForm.disable();
    }
  }

  transfer() {
    const value = this.transferForm.getRawValue();
    const transaction: Transaction = {
      amount: value.amount,
      categoryCode: '#1180aa',
      merchant: value.to,
      transactionType: 'Transaction',
      transactionDate: new Date().getTime()
    };
    this.transactionService.submitTransaction(transaction);
    this.resetForm();
  }
}
