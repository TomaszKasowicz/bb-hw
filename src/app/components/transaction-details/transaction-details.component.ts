import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {
  @Input()
  public transaction: Transaction;

  constructor() {}

  ngOnInit(): void {}
}
