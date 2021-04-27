import { map, pairwise, switchMap, take, tap } from 'rxjs/operators';
import { Transaction } from '../model/transaction';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    service = new TransactionsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return statically mocked balance after creation', () => {
    expect(service.getCurrentBalance()).toEqual(5824.76);
  });

  it('Should return statically mocked transaction list after creation', done => {
    service.getRecentTransactions().subscribe(t => {
      expect(t.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  it('Should submit new transaction', done => {
    service
      .getRecentTransactions()
      .pipe(pairwise())
      .subscribe(([previousTransactions, currentTransactions]) => {
        expect(currentTransactions.length).toEqual(
          previousTransactions.length + 1
        );
        done();
      });

    service.submitTransaction({
      amount: 100,
      categoryCode: '#123456',
      merchant: 'Some merchant',
      transactionDate: new Date().getTime(),
      transactionType: 'Transaction'
    });
  });

  it('Should submit new transaction and find logo for existing merchant', done => {
    service.submitTransaction({
      amount: 100,
      categoryCode: '#123456',
      merchant: 'The Tea Lounge',
      transactionDate: new Date().getTime(),
      transactionType: 'Transaction'
    });

    service.getRecentTransactions().subscribe(transactions => {
      const submited_transaction = transactions.find(
        t => t.categoryCode === '#123456'
      );
      expect(submited_transaction).toBeTruthy();
      expect(submited_transaction?.merchantLogo).toBeTruthy();
      done();
    });
  });
});
