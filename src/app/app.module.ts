import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { WindowHeaderComponent } from './components/window-header/window-header.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsComponent,
    TransactionFormComponent,
    RecentTransactionsComponent,
    TransactionDetailsComponent,
    WindowHeaderComponent,
    SearchComponent,
    SortComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
