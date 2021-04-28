import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TransactionDetailsComponent } from './transaction-details.component';
import { Transaction } from '../../model/transaction';

describe('TransactionDetailsComponent', () => {
  let spectator: Spectator<TransactionDetailsComponent>;
  const createComponent = createComponentFactory(TransactionDetailsComponent);
  const transaction: Transaction = {
    amount: 123.45,
    categoryCode: '#123456',
    merchant: 'merchant',
    transactionDate: new Date(2021, 3, 27).getTime(),
    transactionType: 'Transaction',
    merchantLogo: 'Logo'
  };

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Should Render Details with logo', () => {
    spectator.setInput({ transaction });
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();

    const divElements = spectator.queryAll('.item');
    expect(divElements.length).toEqual(4);

    expect(spectator.query('img')).toBeTruthy();
  });

  it('Should Render Details without logo', () => {
    const transactionWithoutLogo = { ...transaction, merchantLogo: undefined };
    spectator.setInput({ transaction: transactionWithoutLogo });
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();

    const divElements = spectator.queryAll('.item');
    expect(divElements.length).toEqual(4);
    expect(spectator.query('img')).toBeFalsy();
  });
});
