import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { mockProvider } from '@ngneat/spectator';
import { TransactionsService } from '../../services/transactions.service';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { WindowHeaderComponent } from '../window-header/window-header.component';
import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TransactionFormComponent,
        WindowHeaderComponent,
        FormErrorsComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [mockProvider(TransactionsService)]
    });

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
