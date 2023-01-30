import { Component } from '@angular/core';
import { DefaultEditorBase } from './default-editor';

@Component({
  selector: 'input-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <input [ngClass]="inputClass"
          class="form-control"
          [(ngModel)]="cell.newValue"
          [name]="cell.getId()"
          [placeholder]="cell.getTitle()"
          [disabled]="!cell.isEditable()"
          (click)="clickedEvent.emit($event)"
          (keydown.enter)="editedEvent.emit($event)"
          (keydown.esc)="stoppedEditingEvent.emit()">
    `,
})
export class InputEditorComponent 
extends DefaultEditorBase {

  constructor() {
    super();
  }
}
