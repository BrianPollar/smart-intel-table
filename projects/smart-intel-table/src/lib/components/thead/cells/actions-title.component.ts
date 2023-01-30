import {Component, Input, AfterViewInit, ElementRef, OnChanges} from '@angular/core';
import { Grid } from '../../../defines/grid.define';

@Component({
  selector: '[smart-table-actions-title]',
  template: `
    <div class="smart-table-title">{{ actionsColumnTitle }}</div>
  `,
})
export class ActionsTitleComponent 
implements AfterViewInit, OnChanges {
  @Input() grid: Grid;
  actionsColumnTitle: string;

  constructor(private ref: ElementRef) { }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add('smart-table-actions');
  }

  ngOnChanges() {
    this.actionsColumnTitle = this.grid.getSetting('actions.columnTitle');
  }
}
