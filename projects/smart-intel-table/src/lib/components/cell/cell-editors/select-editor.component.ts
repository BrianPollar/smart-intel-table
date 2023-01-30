import { Component } from '@angular/core';
import { DefaultEditorBase } from './default-editor';

@Component({
  selector: 'select-editor',
  template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [(ngModel)]="cell.newValue"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="clickedEvent.emit($event)"
            (keydown.enter)="editedEvent.emit($event)"
            (keydown.esc)="stoppedEditingEvent.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value"
                [selected]="option.value === cell.getValue()">{{ option.title }}
        </option>
    </select>
    `,
})
export class SelectEditorComponent 
extends DefaultEditorBase {

  constructor() {
    super();
  }
}
