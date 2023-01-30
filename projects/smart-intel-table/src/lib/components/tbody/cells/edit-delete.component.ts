import {Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Row } from '../../../defines/data-set/row.define';
import { DataSource } from '../../../defines/data-source/data-source.define';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: 'smart-table-body-edit-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#" *ngIf="isActionEdit" class="smart-table-action smart-table-action-edit-edit"
        [innerHTML]="editRowButtonContent" (click)="onEdit($event)"></a>
    <a href="#" *ngIf="isActionDelete" class="smart-table-action smart-table-action-delete-delete"
        [innerHTML]="deleteRowButtonContent" (click)="onDelete($event)"></a>
  `,
})
export class TbodyEditDeleteComponent 
implements OnChanges {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();
  isActionEdit: boolean;
  isActionDelete: boolean;
  editRowButtonContent: string;
  deleteRowButtonContent: string;

  onEdit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.editRowSelect.emit(this.row);

    if (this.grid.getSetting('mode') === 'external') {
      this.edit.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.edit(this.row);
    }
  }

  onDelete(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.grid.getSetting('mode') === 'external') {
      this.delete.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.delete(this.row, this.deleteConfirm);
    }
  }

  ngOnChanges(){
    this.isActionEdit = this.grid.getSetting('actions.edit');
    this.isActionDelete = this.grid.getSetting('actions.delete');
    this.editRowButtonContent = this.grid.getSetting('edit.editButtonContent');
    this.deleteRowButtonContent = this.grid.getSetting('delete.deleteButtonContent');
  }
}
