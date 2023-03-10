import { Component } from '@angular/core';
import { DefaultEditorBase } from './default-editor';

@Component({
  selector: 'checkbox-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <input [ngClass]="inputClass"
          type="checkbox"
          class="form-control"
          [name]="cell.getId()"
          [disabled]="!cell.isEditable()"
          [checked]="cell.getValue() == (cell.getColumn().getConfig()?.true || true)"
          (click)="clickedEvent.emit($event)"
          (change)="onChange($event)">
    `,
})
export class CheckboxEditorComponent 
extends DefaultEditorBase {
  constructor() {
    super();
  }

  onChange(event) {
    const trueVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().true) || true;
    const falseVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().false) || false;
    this.cell.newValue = event.target.checked ? trueVal : falseVal;
  }
}
