import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Column } from '../../../defines/data-set/column.define';
import { DataSource } from '../../../defines/data-source/data-source.define';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: '[smart-table-thead-filters-row]',
  template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th smart-table-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())" class="smart-table-th {{ column.id }}">
      <smart-intel-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
                              (filter)="filter.emit($event)">
      </smart-intel-table-filter>
    </th>
    <th smart-table-add-button *ngIf="showActionColumnRight"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `,
})
export class TheadFitlersRowComponent 
implements OnChanges {
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Output() create = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();
  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  filterInputClass: string;

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.filterInputClass = this.grid.getSetting('filter.inputClass');
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }
}
