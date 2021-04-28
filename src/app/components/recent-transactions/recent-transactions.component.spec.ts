import {
  createComponentFactory,
  mockProvider,
  Spectator,
  SpyObject
} from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { mockData } from '../../../mock/transactions';
import { TransactionsService } from '../../services/transactions.service';
import { SearchComponent } from '../search/search.component';
import { SortComponent } from '../sort/sort.component';
import { WindowHeaderComponent } from '../window-header/window-header.component';
import { RecentTransactionsComponent } from './recent-transactions.component';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';

describe('RecentTransactionsComponent', () => {
  let spectator: Spectator<RecentTransactionsComponent>;
  let service: SpyObject<TransactionsService>;

  const createComponent = createComponentFactory({
    component: RecentTransactionsComponent,
    declarations: [
      MockComponent(WindowHeaderComponent),
      MockComponent(SearchComponent),
      MockComponent(SortComponent),
      MockComponent(TransactionDetailsComponent)
    ],
    providers: [mockProvider(TransactionsService)],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    service = spectator.inject(TransactionsService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render empty list of transactions', () => {
    service.getRecentTransactions.mockReturnValue(of([]));
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
    const detailElements = spectator.queryAll(TransactionDetailsComponent);
    expect(detailElements.length).toEqual(0);
  });

  describe('Transaction Filtering', () => {
    const transactions = mockData;

    it('Should render all transactions when filter is empty', () => {
      service.getRecentTransactions.mockReturnValue(of(transactions));
      spectator.detectChanges();
      expect(spectator.fixture).toMatchSnapshot();
      const detailElements = spectator.queryAll(TransactionDetailsComponent);
      expect(detailElements.length).toEqual(transactions.length);
    });

    it('Should render filtred transactions', () => {
      service.getRecentTransactions.mockReturnValue(of(transactions));
      spectator.detectChanges();
      spectator.triggerEventHandler(
        SearchComponent,
        'searchTextChanged',
        'tea'
      );
      spectator.detectChanges();

      expect(spectator.fixture).toMatchSnapshot();
      const detailElements = spectator.queryAll(TransactionDetailsComponent);
      expect(detailElements.length).toEqual(2);
    });
  });
});
