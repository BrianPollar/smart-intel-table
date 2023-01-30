import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../../defines/data-set/cell.define';

@Component({
  selector: 'table-cell-edit-mode',
  template: `
      <div [ngSwitch]="getEditorType()">
        <table-cell-custom-editor *ngSwitchCase="'custom'"
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="editedEvent($event)">
        </table-cell-custom-editor>
        <table-cell-default-editor *ngSwitchDefault
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="editedEvent($event)">
        </table-cell-default-editor>
      </div>
    `,
})
export class EditCellComponent {
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Output() edited = new EventEmitter<any>();
  editedEvent(event): boolean {
    this.edited.next(event);
    return false;
  }

  getEditorType(): string {
    return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
  }
}
