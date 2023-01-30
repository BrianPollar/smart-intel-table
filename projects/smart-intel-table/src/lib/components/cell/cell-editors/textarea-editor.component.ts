import { Component } from '@angular/core';
import { DefaultEditorBase } from './default-editor';

@Component({
  selector: 'textarea-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <textarea [ngClass]="inputClass"
              class="form-control"
              [(ngModel)]="cell.newValue"
              [name]="cell.getId()"
              [disabled]="!cell.isEditable()"
              [placeholder]="cell.getTitle()"
              (click)="clickedEvent.emit($event)"
              (keydown.enter)="editedEvent.emit($event)"
              (keydown.esc)="stoppedEditingEvent.emit()">
    </textarea>
    `,
})
export class TextareaEditorComponent 
extends DefaultEditorBase {

  constructor() {
    super();
  }
}
