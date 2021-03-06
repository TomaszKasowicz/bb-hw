import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let spectator: Spectator<SearchComponent>;

  const createComponent = createComponentFactory({
    component: SearchComponent,
    imports: [FormsModule]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should apply hidden class to X button when searchText is empty', () => {
    spectator.detectChanges();
    const buttonElem = spectator.query('button');
    expect(spectator.fixture).toMatchSnapshot();
    expect(buttonElem).toHaveClass('hidden');
  });

  it('should show X button when searchText is not falsy', () => {
    spectator.component.searchText = 'abc';
    spectator.detectChanges();

    const buttonElem = spectator.query('button');
    expect(spectator.fixture).toMatchSnapshot();
    expect(buttonElem).not.toHaveClass('hidden');
  });

  it('should emit change when input is filled', done => {
    spectator.typeInElement('test', 'input');
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
    spectator.component.searchTextChanged.subscribe(value => {
      expect(value).toEqual('test');
      done();
    });
    spectator.dispatchKeyboardEvent('input', 'keyup', 't');
  });

  it('should clear searchText when Escape pressed', done => {
    spectator.component.searchText = 'test';
    spectator.detectChanges();

    spectator.component.searchTextChanged.subscribe(value => {
      expect(value).toEqual('');
      done();
    });

    spectator.dispatchKeyboardEvent('input', 'keyup', 'Escape');
  });

  it('should clear searchText when X is clicked', done => {
    spectator.component.searchText = 'test';
    spectator.detectChanges();

    spectator.component.searchTextChanged.subscribe(value => {
      expect(value).toEqual('');
      done();
    });
    spectator.click('button');
  });
});
