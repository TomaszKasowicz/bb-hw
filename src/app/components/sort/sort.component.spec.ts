import { createComponentFactory } from '@ngneat/spectator/jest';
import { Spectator, byText, byTestId } from '@ngneat/spectator';

import { SortComponent } from './sort.component';

describe('SortComponent', () => {
  let spectator: Spectator<SortComponent>;
  const createComponent = createComponentFactory(SortComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Should set sorting by Date by default', () => {
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();
    const arrowForDateElem = spectator.query(byTestId('arrow-for-DATE'));
    expect(arrowForDateElem).not.toHaveClass(['arrow-hidden', 'arrow-up']);
    expect(arrowForDateElem).toHaveClass('arrow-down');
    expect(spectator.component.state).toEqual({
      property: 'transactionDate',
      ascending: false
    });
  });

  it('Arrow should only be visible for one active label', () => {
    spectator.detectChanges();
    const allArrowElements = spectator.queryAll('.arrow');
    const hiddenArrowElements = spectator.queryAll('.arrow-hidden');
    expect(allArrowElements.length).toEqual(hiddenArrowElements.length + 1);
  });

  it('Should toggle sorting by Date to descending when button clicked', () => {
    spectator.detectChanges();
    spectator.click(spectator.query(byTestId('button-for-DATE')) as any);
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
    const arrowForDateElem = spectator.query(byTestId('arrow-for-DATE'));
    expect(arrowForDateElem).not.toHaveClass(['arrow-hidden', 'arrow-down']);
    expect(arrowForDateElem).toHaveClass('arrow-up');
    expect(spectator.component.state).toEqual({
      property: 'transactionDate',
      ascending: true
    });
  });

  // todo: Convert this to it.each
  it('Should toggle sorting by Beneficiary when button clicked', () => {
    spectator.detectChanges();
    spectator.click(spectator.query(byTestId('button-for-BENEFICIARY')) as any);
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
    const arrowForBeneficiaryElem = spectator.query(
      byTestId('arrow-for-BENEFICIARY')
    );
    expect(arrowForBeneficiaryElem).not.toHaveClass([
      'arrow-hidden',
      'arrow-up'
    ]);
    expect(arrowForBeneficiaryElem).toHaveClass('arrow-down');
    expect(spectator.component.state).toEqual({
      property: 'merchant',
      ascending: false
    });
  });

  it('Should toggle sorting by Amount when button clicked', () => {
    spectator.detectChanges();
    spectator.click(spectator.query(byTestId('button-for-AMOUNT')) as any);
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
    const arrowForBeneficiaryElem = spectator.query(
      byTestId('arrow-for-AMOUNT')
    );
    expect(arrowForBeneficiaryElem).not.toHaveClass([
      'arrow-hidden',
      'arrow-up'
    ]);
    expect(arrowForBeneficiaryElem).toHaveClass('arrow-down');
    expect(spectator.component.state).toEqual({
      property: 'amount',
      ascending: false
    });
  });
});
