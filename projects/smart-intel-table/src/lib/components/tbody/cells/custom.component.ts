import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../../defines/data-set/row.define';
import { Grid } from '../../../defines/grid.define';

@Component({
    selector: 'smart-table-body-custom',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <a *ngFor="let action of grid.getSetting('actions.custom')" href="#"
        class="smart-table-action smart-table-action-custom-custom" 
        [innerHTML]="action.title"
        (click)="onCustom(action, $event)"></a>
        `
})
export class TbodyCustomComponent {
    @Input() grid: Grid;
    @Input() row: Row;
    @Input() source;
    @Output() custom = new EventEmitter<any>();

    onCustom(action, event) {
        event.preventDefault();
        event.stopPropagation();

        this.custom.emit({
            action: action.name,
            data: this.row.getData(),
            source: this.source
        });
    }

}
