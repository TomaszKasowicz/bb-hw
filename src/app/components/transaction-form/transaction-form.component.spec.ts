import { ReactiveFormsModule } from '@angular/forms';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
  byText
} from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { TransactionsService } from '../../services/transactions.service';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let spectator: Spectator<TransactionFormComponent>;
  const createComponent = createComponentFactory({
    component: TransactionFormComponent,
    declarations: [TransactionFormComponent, FormErrorsComponent],
    imports: [ReactiveFormsModule],
    providers: [mockProvider(TransactionsService)],
    shallow: true,
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Should render clean form without any options', () => {
    const transactionsService = spectator.inject<TransactionsService>(
      TransactionsService
    );
    transactionsService.getRecentTransactions.mockReturnValue(of([]));
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();

    const submitButton = spectator.query(byText('SUBMIT'));
    expect(submitButton).toBeTruthy();
    expect(submitButton?.getAttribute('disabled')).toEqual('');
  });

  it('Should Render Merchant options retrieved from recent transactions', () => {
    const transactionsService = spectator.inject<TransactionsService>(
      TransactionsService
    );
    const transactions: any[] = [
      { merchant: 'a' },
      { merchant: 'b' },
      { merchant: 'b' }
    ];
    transactionsService.getRecentTransactions.mockReturnValue(of(transactions));
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();

    const submitButton = spectator.query(byText('SUBMIT'));
    expect(submitButton).toBeTruthy();
    expect(submitButton?.getAttribute('disabled')).toEqual('');

    const options = spectator.queryAll('option');
    expect(options.length).toEqual(transactions.length - 1);
  });

  describe('Form Submission', () => {
    const merchant = 'merchant';
    const amount = 123.45;

    beforeEach(() => {
      const transactionsService = spectator.inject<TransactionsService>(
        TransactionsService
      );
      transactionsService.getRecentTransactions.mockReturnValue(of([]));
      spectator.detectChanges();

      spectator.typeInElement(merchant, '#to');
      spectator.typeInElement(`${amount}`, '#amount');
      spectator.detectChanges();
    });

    it('Should Enable Submit Button when beneficiary is filled and ammount is filled', () => {
      expect(spectator.fixture).toMatchSnapshot();

      const submitButton = spectator.query(byText('SUBMIT'));
      expect(submitButton).toBeTruthy();
      expect(submitButton?.getAttribute('disabled')).toBeNull();
    });

    it('Should disable form controls and render cancel/transfer buttons when submit clicked', () => {
      spectator.click(byText('SUBMIT'));
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();

      const buttons = spectator.queryAll('button');
      expect(buttons.length).toEqual(2);

      const inputToElement = spectator.query('#to');
      const inputAmountElement = spectator.query('#amount');
      expect(inputToElement?.getAttribute('disabled')).toEqual('');
      expect(inputAmountElement?.getAttribute('disabled')).toEqual('');
    });

    it('Should Send Transfer when transfer button is clicked', () => {
      spectator.click(byText('SUBMIT'));
      spectator.detectChanges();
      spectator.click(byText('TRANSFER'));
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();

      expectSubmitButtonIsDisabled();
      expectFormIsCleared();

      const transactionService = spectator.inject(TransactionsService);
      expect(transactionService.submitTransaction).toHaveBeenCalledTimes(1);
      expect(transactionService.submitTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
          amount: amount,
          categoryCode: '#1180aa',
          merchant: merchant,
          transactionType: 'Transaction'
        })
      );
    });

    it('Should Reset Form when cancel is clicked', () => {
      spectator.click(byText('SUBMIT'));
      spectator.detectChanges();
      spectator.click(byText('CANCEL'));
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
      expectSubmitButtonIsDisabled();
      expectFormIsCleared();

      const transactionService = spectator.inject(TransactionsService);
      expect(transactionService.submitTransaction).toHaveBeenCalledTimes(0);
    });
  });

  describe('Form Errors', () => {
    beforeEach(() => {
      const transactionsService = spectator.inject<TransactionsService>(
        TransactionsService
      );
      transactionsService.getRecentTransactions.mockReturnValue(of([]));
      spectator.detectChanges();
    });

    it('Should render that Beneficiary is required', () => {
      spectator.typeInElement('Beneficiary', '#to');
      spectator.detectChanges();
      spectator.typeInElement('', '#to');

      expect(spectator.fixture).toMatchSnapshot();
      expect(spectator.query(byText('Beneficiary is required'))).toBeTruthy();
    });

    it('Should render that Amount is required', () => {
      spectator.typeInElement('123', '#amount');
      spectator.detectChanges();
      spectator.typeInElement('', '#amount');

      expect(spectator.fixture).toMatchSnapshot();
      expect(spectator.query(byText('Amount is required'))).toBeTruthy();
    });

    it('Should render that Amount should be a fixed number', () => {
      spectator.typeInElement('abcdefg', '#amount');
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
      expect(
        spectator.query(byText('Fixed number (i.e. 123 or 123.45)'))
      ).toBeTruthy();
    });

    it('Should render that Amount will overdraft account balance', () => {
      const service = spectator.inject(TransactionsService);
      service.getCurrentBalance.mockReturnValue(400);

      spectator.typeInElement('1000', '#amount');
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
      expect(spectator.query(byText('Will overdraft'))).toBeTruthy();
    });
  });

  function expectSubmitButtonIsDisabled() {
    const submitButton = spectator.query(byText('SUBMIT'));
    expect(submitButton).toBeTruthy();
    expect(submitButton?.getAttribute('disabled')).toEqual('');
  }

  function expectFormIsCleared() {
    const inputFromElement = spectator.query('#from');
    const inputToElement = spectator.query('#to');
    const inputAmountElement = spectator.query('#amount');
    expect(inputFromElement?.getAttribute('disabled')).toEqual('');
    expect(inputToElement?.getAttribute('disabled')).toEqual(null);
    expect(inputAmountElement?.getAttribute('disabled')).toEqual(null);
  }
});
