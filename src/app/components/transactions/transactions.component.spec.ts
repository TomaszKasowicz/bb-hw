import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let spectator: Spectator<TransactionsComponent>;
  const createComponent = createComponentFactory({
    component: TransactionsComponent,
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Should render', () => {
    expect(spectator.fixture).toMatchInlineSnapshot(`
      <app-transactions
        __ngContext__={[Function LRootView]}
      >
        <app-transaction-form
          class="window flex-grow-1"
        /><app-recent-transactions
          class="window flex-grow-2"
        />
      </app-transactions>
    `);
  });
});
