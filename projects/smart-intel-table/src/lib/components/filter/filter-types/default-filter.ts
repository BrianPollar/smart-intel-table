import { Input, Output, EventEmitter, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Column } from '../../../defines/data-set/column.define';

@Component({
  template: ''
})
export class DefaultFilter
implements Ifilter, OnDestroy {
  @Input() query: string;
  @Input() inputClass: string;
  @Input() column: Column;
  @Output() filter = new EventEmitter<string>();
  delay = 300;
  changesSubscription: Subscription;

  ngOnDestroy() {
    if (this.changesSubscription) {
      this.changesSubscription.unsubscribe();
    }
  }

  setFilter() {
    this.filter.emit(this.query);
  }
}

export interface Ifilter {
  delay?: number;
  changesSubscription?: Subscription;
  query: string;
  inputClass: string;
  column: Column;
  filter: EventEmitter<string>;
}
