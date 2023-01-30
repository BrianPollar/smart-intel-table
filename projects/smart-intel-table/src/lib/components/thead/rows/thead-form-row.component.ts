import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cell } from '../../../defines/data-set/cell.define';
import { Row } from '../../../defines/data-set/row.define';
import { Grid } from '../../../defines/grid.define';


@Component({
  selector: '[smart-table-thead-form-row]',
  template: `
      <td *ngIf=""></td>
      <td  *ngIf="showActionColumnLeft"  class="smart-table-actions">
        <smart-table-actions [grid]="grid" (create)="onCreate($event)"></smart-table-actions>
      </td>
      <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
        <smart-intel-table-cell [cell]="cell"
                              [grid]="grid"
                              [isNew]="true"
                              [createConfirm]="createConfirm"
                              [inputClass]="addInputClass"
                              [isInEditing]="grid.getNewRow().isInEditing"
                              (edited)="onCreate($event)">
        </smart-intel-table-cell>
      </td>
      <td  *ngIf="showActionColumnRight"  class="smart-table-actions">
        <smart-table-actions [grid]="grid" (create)="onCreate($event)"></smart-table-actions>
      </td>
  `,
})
export class TheadFormRowComponent 
implements OnChanges {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() createConfirm: EventEmitter<any>;
  @Output() create = new EventEmitter<any>();
  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  addInputClass: string;

  onCreate(event) {
    event.stopPropagation();
    this.grid.create(this.grid.getNewRow(), this.createConfirm);
  }

  ngOnChanges(){
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.addInputClass = this.grid.getSetting('add.inputClass');
  }

  getVisibleCells(cells: Array<Cell>): Array<Cell> {
    return (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
  }
}
