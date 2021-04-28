import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Should render', () => {
    expect(spectator.fixture).toMatchInlineSnapshot(`
      <app-root
        __ngContext__={[Function LRootView]}
        title={[Function String]}
      >
        <app-header /><app-transactions
          class="transactions"
        />
      </app-root>
    `);
  });
});
