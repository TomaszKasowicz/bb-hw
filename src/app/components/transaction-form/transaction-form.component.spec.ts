import { TransactionFormComponent } from './transaction-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowHeaderComponent } from '../window-header/window-header.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFormComponent, WindowHeaderComponent],
      imports: [ReactiveFormsModule],
      providers: [TransactionsService]
    });

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
