import { FormControl, ValidatorFn } from '@angular/forms';
import { MockService } from 'ng-mocks';
import { TransactionsService } from '../../services/transactions.service';
import { balanceValidator } from './balance.validator';

describe('balance validator', () => {
  const transactionsService = {
    getCurrentBalance: jest.fn()
  };

  let validatorFn: ValidatorFn;
  const control = new FormControl(null);

  beforeEach(() => {
    validatorFn = balanceValidator(transactionsService as any);
  });

  it('Should return null when no overdraft', () => {
    control.setValue(100);
    transactionsService.getCurrentBalance.mockReturnValue(-399);

    expect(validatorFn(control)).toBeNull();
  });

  it('Should return error object when overdraft', () => {
    control.setValue(100);
    transactionsService.getCurrentBalance.mockReturnValue(-401);

    expect(validatorFn(control)).toEqual({ balanceOverdraft: true });
  });
});
