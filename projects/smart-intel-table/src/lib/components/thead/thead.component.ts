/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataSource } from '../../defines/data-source/data-source.define';
import { Grid } from '../../defines/grid.define';

@Component({
  selector: '[smart-table-thead]',
  templateUrl: './thead.component.html'
})
export class Ng2SmartTableTheadComponent
implements OnChanges {
    @Input() grid: Grid;
    @Input() source: DataSource;
    @Input() isAllSelected: boolean;
    @Input() createConfirm: EventEmitter<any>;
    @Output() sort = new EventEmitter<any>();
    @Output() selectAllRows = new EventEmitter<any>();
    @Output() create = new EventEmitter<any>();
    @Output() filter = new EventEmitter<any>();
    isHideHeader: boolean;
    isHideSubHeader: boolean;

    ngOnChanges() {
      this.isHideHeader = this.grid.getSetting('hideHeader');
      this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
    }
}
