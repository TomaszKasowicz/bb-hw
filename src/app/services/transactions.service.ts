import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mockData } from '../../mock/transactions';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private recentTransactions = new BehaviorSubject(mockData);
  private currentBalance = 5824.76;

  getRecentTransactions() {
    return this.recentTransactions.asObservable();
  }

  getCurrentBalance() {
    return this.currentBalance;
  }

  submitTransaction(transaction: Transaction) {
    transaction.merchantLogo = this.findLogo(transaction);
    this.currentBalance -= transaction.amount;
    this.recentTransactions.next([
      ...this.recentTransactions.value,
      transaction
    ]);
  }

  private findLogo(transaction: Transaction) {
    if (transaction.merchantLogo) {
      return;
    }
    const { merchant } = transaction;
    return this.recentTransactions.value.find(
      t => t.merchant.localeCompare(merchant) === 0
    )?.merchantLogo;
  }

  constructor() {}
}
