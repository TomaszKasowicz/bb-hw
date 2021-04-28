import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface ErrorMessages {
  [key: string]: string;
}

@Component({
  selector: 'app-form-errors',
  template: `
    <ng-container *ngIf="ctrl?.dirty && ctrl?.errors">
      <div class="error" *ngFor="let error of ctrl?.errors | keyvalue">
        {{ errorMessages[error.key] || error.key }}
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }

      .error {
        font-size: 0.75em;
        width: 100%;
        color: var(--color-peachtree-orange);
      }
    `
  ]
})
export class FormErrorsComponent {
  @Input()
  public ctrl: AbstractControl | null;

  @Input()
  public errorMessages: ErrorMessages = {};
}
