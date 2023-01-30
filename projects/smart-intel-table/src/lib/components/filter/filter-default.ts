import { Output, EventEmitter, Input, Component } from '@angular/core';
import { Column } from '../../defines/data-set/column.define';
import { DataSource } from '../../defines/data-source/data-source.define';

@Component({
  template: ''
})
export class FilterDefault {
  @Input() column: Column;
  @Input() source: DataSource;
  @Input() inputClass = '';
  @Output() filter = new EventEmitter<any>();
  query = '';

  onFilter(query: string) {
    this.source.addFilter({
      field: this.column.id,
      search: query,
      filter: this.column.getFilterFunction()
    });
  }
}
