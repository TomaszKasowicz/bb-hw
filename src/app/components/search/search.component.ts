import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output()
  public searchTextChanged = new EventEmitter<string>();
  public searchText: string;

  emitChange(event?: KeyboardEvent) {
    if (event?.key === 'Escape') {
      this.searchText = '';
    }
    this.searchTextChanged.emit(this.searchText);
  }

  clear() {
    this.searchText = '';
    this.emitChange();
  }
}
