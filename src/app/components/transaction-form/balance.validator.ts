import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';

const MIN_BALANCE = -500.0;

export function balanceValidator(transactionsService: TransactionsService) {
  return (control: AbstractControl): ValidationErrors | null => {
    const amount = +control.value;
    const balance = transactionsService.getCurrentBalance();
    const newBalance = balance - amount;

    if (newBalance < MIN_BALANCE) {
      return { 'balance-overdraft': true };
    }
    return null;
  };
}
