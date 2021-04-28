import { createComponentFactory } from '@ngneat/spectator/jest';
import { byText, Spectator } from '@ngneat/spectator';
import { FormErrorsComponent } from './form-errors.component';
import { FormControl } from '@angular/forms';
describe('FormErrorsComponent', () => {
  let spectator: Spectator<FormErrorsComponent>;
  const createCompoent = createComponentFactory(FormErrorsComponent);

  beforeEach(() => {
    spectator = createCompoent();
  });

  it('Should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Should not render any errors if control is pristine', () => {
    const ctrl = new FormControl('');
    ctrl.setErrors({ someError: true }, { emitEvent: false });
    const errorMessages = { someError: 'Some Error Message' };
    spectator.setInput({ ctrl, errorMessages });

    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();

    const divElements = spectator.queryAll('div');
    expect(divElements.length).toEqual(0);
  });

  it('Should not render any errors if control is dirty but valid', () => {
    const ctrl = new FormControl('');
    ctrl.markAsDirty();
    const errorMessages = { someError: 'Some Error Message' };

    spectator.setInput({ ctrl, errorMessages });
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();

    const divElements = spectator.queryAll('div');
    expect(divElements.length).toEqual(0);
  });

  it('Should render message when ctrl has errors and error Message is available', () => {
    const ctrl = new FormControl('');
    ctrl.setErrors({ someError: true }, { emitEvent: false });
    ctrl.markAsDirty();

    const errorMessages = { someError: 'Some Error Message' };

    spectator.setInput({ ctrl, errorMessages });
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();
    expect(spectator.query(byText('Some Error Message'))).toBeTruthy();
  });

  it('Should render error key when error message is not available', () => {
    const ctrl = new FormControl('');
    ctrl.setErrors({ someError: true }, { emitEvent: false });
    ctrl.markAsDirty();

    const errorMessages = { someOtherError: 'Some Error Message' };

    spectator.setInput({ ctrl, errorMessages });
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();
    expect(spectator.query(byText('someError'))).toBeTruthy();
  });
});
