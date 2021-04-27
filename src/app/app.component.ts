import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-transactions class="transactions"></app-transactions>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .transactions {
        flex-grow: 1;
        min-height: 0;
      }
    `
  ]
})
export class AppComponent {
  title = 'homework';
}
