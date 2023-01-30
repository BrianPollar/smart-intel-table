import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Cell } from '../../../defines/data-set/cell.define';

@Component({
  template: ''
})
export class EditCellDefault {
  @Input() cell: Cell;
  @Input() inputClass = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() edited = new EventEmitter<any>();

  editedEvent(event) {
    this.edited.next(event);
    return false;
  }

  stoppedEditingEvent() {
    this.cell.getRow().isInEditing = false;
    return false;
  }

  clickedEvent(event) {
    event.stopPropagation();
  }
}
