import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory(HeaderComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render image', () => {
    expect(spectator.fixture).toMatchInlineSnapshot(`
      <app-header
        __ngContext__={[Function LRootView]}
      >
        <header>
          <img
            src="./assets/logo.jpg"
          />
        </header>
      </app-header>
    `);
  });
});
