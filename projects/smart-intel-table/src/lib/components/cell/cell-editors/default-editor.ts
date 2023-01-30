/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Cell } from '../../../defines/data-set/cell.define';

@Component({
  template: ''
})
export class DefaultEditorBase
implements Ieditor {
  @Input() cell: Cell;
  @Input() inputClass: string;
  @Output() stoppedEditingEvent = new EventEmitter<any>();
  @Output() editedEvent = new EventEmitter<any>();
  @Output() clickedEvent = new EventEmitter<any>();
}

export interface Ieditor {
  cell: Cell;
  inputClass: string;
  stoppedEditingEvent: EventEmitter<any>;
  editedEvent: EventEmitter<any>;
  clickedEvent: EventEmitter<any>;
}
