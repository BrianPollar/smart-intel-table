import { Component, Input, OnInit } from '@angular/core';
import { IviewCell } from 'smart-intel-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent 
implements IviewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData;

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

}
