import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Column } from '../../../defines/data-set/column.define';
import { DataSource } from '../../../defines/data-source/data-source.define';

@Component({
  selector: 'smart-table-column-title',
  template: `
    <div class="smart-table-title">
      <smart-intel-table-title [source]="source" [column]="column" (sort)="sort.emit($event)"></smart-intel-table-title>
    </div>
  `,
})
export class ColumnTitleComponent {
  @Input() column: Column;
  @Input() source: DataSource;
  @Output() sort = new EventEmitter<any>();
}
