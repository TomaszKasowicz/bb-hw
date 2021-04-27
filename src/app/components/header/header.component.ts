import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <img src="/assets/logo.jpg" />
    </header>
  `,
  styles: [
    `
      header {
        background-color: var(--color-background-primary);
        border-bottom: 2px solid var(--color-peachtree-orange);
        padding: 1em 0em;
      }

      img {
        margin-left: 5em;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
