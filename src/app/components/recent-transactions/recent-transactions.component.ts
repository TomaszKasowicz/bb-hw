import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, switchMapTo, withLatestFrom } from 'rxjs/operators';
import { SortState } from '../../model/sort-state';
import { Transaction } from '../../model/transaction';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  public transactions$: Observable<Transaction[]>;

  private filter$ = new BehaviorSubject('');
  private sort$ = new BehaviorSubject<SortState>({
    property: 'transactionDate',
    ascending: false
  });

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    const rawTransactions$ = this.transactionsService.getRecentTransactions();
    this.transactions$ = merge(rawTransactions$, this.filter$, this.sort$).pipe(
      switchMapTo(rawTransactions$),
      withLatestFrom(this.filter$),
      map(([transactions, filterText]) =>
        this.filterTransactions(transactions, filterText)
      ),
      withLatestFrom(this.sort$),
      map(
        ([filteredTransactions, sort]: [
          fiteredTranactions: Transaction[],
          sort: SortState
        ]) => this.sortTransactions(filteredTransactions, sort)
      )
    );
  }

  setFilter(text: string) {
    this.filter$.next(text);
  }

  setSorting(sort: SortState) {
    this.sort$.next(sort);
  }

  private filterTransactions(
    transactions: Transaction[],
    filterText?: string
  ): Transaction[] {
    if (!filterText) {
      return transactions;
    }

    const caseInsensitiveFilter = filterText.toLowerCase();
    return transactions.filter(
      t =>
        t.merchant.toLowerCase().includes(caseInsensitiveFilter) ||
        t.transactionType.toLowerCase().includes(filterText)
    );
  }

  private sortTransactions(
    transactions: Transaction[],
    sort: SortState
  ): Transaction[] {
    const { property, ascending } = sort;
    return transactions.sort((a: Transaction, b: Transaction) => {
      const aValue: string | number | undefined =
        a[property as keyof Transaction];
      const bValue: string | number | undefined =
        b[property as keyof Transaction];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return ascending ? aValue - bValue : bValue - aValue;
      }

      return ascending
        ? (aValue as string).localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue as string);
    });
  }
}
