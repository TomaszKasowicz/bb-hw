import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { defer, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Transaction } from '../../model/transaction';
import { TransactionsService } from '../../services/transactions.service';
import { ErrorMessages } from '../form-errors/form-errors.component';
import { balanceValidator } from './balance.validator';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  public transferForm: FormGroup;
  public ctrlTo: AbstractControl | null;
  public ctrlAmount: AbstractControl | null;
  public isReview: boolean;

  public disabled$: Observable<boolean>;
  public merchants$: Observable<string[]>;

  public amountErrorMessages: ErrorMessages = {
    required: 'Amount is required',
    pattern: 'Fixed number (i.e. 123 or 123.45)',
    balanceOverdraft: 'Will overdraft'
  };

  public beneficiaryErrroMessages: ErrorMessages = {
    required: 'Beneficiary is required'
  };

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService
  ) {
    this.transferForm = this.fb.group({
      from: this.fb.control(null),
      to: this.fb.control(null, [Validators.required]),
      amount: this.fb.control(null, [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{2})?$/),
        balanceValidator(this.transactionService)
      ])
    });
    this.ctrlTo = this.transferForm.get('to');
    this.ctrlAmount = this.transferForm.get('amount');
  }

  ngOnInit(): void {
    this.resetForm();
    this.disabled$ = defer(() => this.transferForm.statusChanges).pipe(
      map(status => status === 'INVALID'),
      startWith(true)
    );

    this.merchants$ = this.transactionService
      .getRecentTransactions()
      .pipe(map(transactions => transactions.map(t => t.merchant)));
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
      amount: +value.amount,
      categoryCode: '#1180aa',
      merchant: value.to,
      transactionType: 'Transaction',
      transactionDate: new Date().getTime()
    };
    this.transactionService.submitTransaction(transaction);
    this.resetForm();
  }
}
