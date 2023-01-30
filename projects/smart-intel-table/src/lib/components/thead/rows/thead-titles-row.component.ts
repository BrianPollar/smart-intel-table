import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Column } from '../../../defines/data-set/column.define';
import { DataSource } from '../../../defines/data-source/data-source.define';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: '[smart-table-thead-titles-row]',
  styleUrls: ['../th-style.scss'],
  template: `
    <th smart-table-checkbox-select-all *ngIf="isMultiSelectVisible"
                                  [grid]="grid"
                                  [source]="source"
                                  [isAllSelected]="isAllSelected"
                                  (click)="selectAllRows.emit($event)">
    </th>
    <th smart-table-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th [smartResizeColumn]="isResizable"
  [index]="determineIndex(i)" *ngFor="let column of getVisibleColumns(grid.getColumns()); let i = index"
        class="smart-table-th {{ column.id }}"
        [ngClass]="column.class"
        [style.width]="column.width">
      <smart-table-column-title [source]="source" [column]="column" (sort)="sort.emit($event)"></smart-table-column-title>
    </th>
    <th [smartResizeColumn]="isResizable"
  [index]="determineIndex(getVisibleColumns(grid.getColumns()).length + 1)" smart-table-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `,
})
export class TheadTitlesRowComponent 
implements OnChanges {
  @Input() grid: Grid;
  @Input() isAllSelected: boolean;
  @Input() source: DataSource;
  @Output() sort = new EventEmitter<any>();
  @Output() selectAllRows = new EventEmitter<any>();
  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  isResizable: boolean;

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.isResizable = this.grid.getSetting('resizable');
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }

  determineIndex(i: number) {
    let index = -1;
  if(this.isMultiSelectVisible){
    index+=1;
  }

  if(this.showActionColumnLeft){
    index+=1;
  }

  return index + i;
  }
}
