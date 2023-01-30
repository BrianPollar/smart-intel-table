import { Component, Input, EventEmitter, OnChanges } from '@angular/core';
import { Row } from '../../../defines/data-set/row.define';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: 'smart-table-body-create-cancel',
  template: `
    <a href="#" class="smart-table-action smart-table-action-edit-save"
        [innerHTML]="saveButtonContent" (click)="onSave($event)"></a>
    <a href="#" class="smart-table-action smart-table-action-edit-cancel"
        [innerHTML]="cancelButtonContent" (click)="onCancelEdit($event)"></a>
  `,
})
export class TbodyCreateCancelComponent 
implements OnChanges {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() editConfirm: EventEmitter<any>;
  cancelButtonContent: string;
  saveButtonContent: string;

  onSave(event) {
    event.preventDefault();
    event.stopPropagation();

    this.grid.save(this.row, this.editConfirm);
  }

  onCancelEdit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.row.isInEditing = false;
  }

  ngOnChanges() {
    this.saveButtonContent = this.grid.getSetting('edit.saveButtonContent');
    this.cancelButtonContent = this.grid.getSetting('edit.cancelButtonContent')
  }
}
