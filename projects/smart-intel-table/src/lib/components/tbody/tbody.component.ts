/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Cell } from '../../defines/data-set/cell.define';
import { DataSource } from '../../defines/data-source/data-source.define';
import { Grid } from '../../defines/grid.define';

@Component({
  selector: '[smart-table-body]',
  styleUrls: ['./tbody.component.scss'],
  templateUrl: './tbody.component.html'
})
export class Ng2SmartTableTbodyComponent
implements OnChanges {
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Input() rowClassFunction: (...args) => any; // Function ;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() edited = new EventEmitter<any>();
  @Output() userSelectRow = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();
  @Output() multipleSelectRow = new EventEmitter<any>();
  @Output() rowHover = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  mode: string;
  editInputClass: string;
  isActionAdd: boolean;
  isActionEdit: boolean;
  isActionDelete: boolean;
  noDataMessage: boolean;

  get tableColumnsCount() {
    const actionColumns = this.isActionAdd || this.isActionEdit || this.isActionDelete ? 1 : 0;
    return this.grid.getColumns().length + actionColumns;
  }

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.mode = this.grid.getSetting('mode');
    this.editInputClass = this.grid.getSetting('edit.inputClass');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.isActionAdd = this.grid.getSetting('actions.add');
    this.isActionEdit = this.grid.getSetting('actions.edit');
    this.isActionDelete = this.grid.getSetting('actions.delete');
    this.noDataMessage = this.grid.getSetting('noDataMessage');
  }

  getVisibleCells(cells: Cell[]): Cell[] {
    return (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
  }
}
