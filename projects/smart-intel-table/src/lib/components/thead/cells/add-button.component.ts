import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { DataSource } from '../../../defines/data-source/data-source.define';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: '[smart-table-add-button]',
  template: `
    <a *ngIf="isActionAdd" href="#" class="smart-table-action smart-table-action-add-add"
        [innerHTML]="addNewButtonContent" (click)="onAdd($event)"></a>
  `,
})
export class AddButtonComponent 
implements AfterViewInit, OnChanges {
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Output() create = new EventEmitter<any>();
  isActionAdd: boolean;
  addNewButtonContent: string;

  constructor(private ref: ElementRef) { }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add('smart-table-actions-title', 'smart-table-actions-title-add');
  }

  ngOnChanges() {
    this.isActionAdd = this.grid.getSetting('actions.add');
    this.addNewButtonContent = this.grid.getSetting('add.addButtonContent');
  }

  onAdd(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.grid.getSetting('mode') === 'external') {
      this.create.emit({
        source: this.source,
      });
    } else {
      this.grid.createFormShown = true;
    }
  }
}
