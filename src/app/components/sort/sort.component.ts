import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortState } from '../../model/sort-state';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  public sortColumns = [
    { label: 'DATE', propertyName: 'transactionDate' },
    { label: 'BENEFICIARY', propertyName: 'merchant' },
    { label: 'AMOUNT', propertyName: 'amount' }
  ];

  @Input()
  public state: SortState = {
    property: 'transactionDate',
    ascending: false
  };

  @Output()
  public sortChange = new EventEmitter<SortState>();

  constructor() {}

  ngOnInit(): void {
    this.sortChange.emit(this.state);
  }

  toggleSort(property: string) {
    const newState =
      property === this.state.property
        ? { ...this.state, ascending: !this.state.ascending }
        : { ...this.state, property };
    this.state = newState;
    console.log(newState);
    this.sortChange.emit(this.state);
  }
}
