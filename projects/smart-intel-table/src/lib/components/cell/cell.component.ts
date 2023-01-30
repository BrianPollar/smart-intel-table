import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../defines/data-set/cell.define';
import { Row } from '../../defines/data-set/row.define';
import { Grid } from '../../defines/grid.define';

@Component({
  selector: 'smart-intel-table-cell',
  template: `
    <table-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></table-cell-view-mode>
    <table-cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                          [inputClass]="inputClass"
                          (edited)="editedEvent($event)">
    </table-cell-edit-mode>
  `,
})
export class CellComponent {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() editConfirm: EventEmitter<any>;
  @Input() createConfirm: EventEmitter<any>;
  @Input() isNew: boolean;
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Input() mode: string = 'inline';
  @Input() isInEditing: boolean = false;
  @Output() edited = new EventEmitter<any>();

  editedEvent(event) {
    if (this.isNew) {
      this.grid.create(this.grid.getNewRow(), this.createConfirm);
    } else {
      this.grid.save(this.row, this.editConfirm);
    }
  }
}
