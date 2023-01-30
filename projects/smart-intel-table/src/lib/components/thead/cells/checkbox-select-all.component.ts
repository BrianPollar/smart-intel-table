import { Component, Input } from '@angular/core';
import { DataSource } from '../../../defines/data-source/data-source.define';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: '[smart-table-checkbox-select-all]',
  template: `
    <input type="checkbox" [ngModel]="isAllSelected">
  `,
})
export class CheckboxSelectAllComponent {
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() isAllSelected: boolean;
}
