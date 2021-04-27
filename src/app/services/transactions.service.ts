import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockData } from '../../mock/transactions';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private _recentTransactions = new BehaviorSubject(mockData);
  private _currentBalance = 5824.76;

  getRecentTransactions() {
    return this._recentTransactions.asObservable();
  }

  getCurrentBalance() {
    return this._currentBalance;
  }

  submitTransaction(transaction: Transaction) {
    transaction.merchantLogo = this.findLogo(transaction);
    this._currentBalance -= transaction.amount;
    this._recentTransactions.next([
      ...this._recentTransactions.value,
      transaction
    ]);
  }

  private findLogo(transaction: Transaction) {
    if (transaction.merchantLogo) {
      return;
    }
    const { merchant } = transaction;
    return this._recentTransactions.value.find(
      t => t.merchant.localeCompare(merchant) === 0
    )?.merchantLogo;
  }

  constructor() {}
}
