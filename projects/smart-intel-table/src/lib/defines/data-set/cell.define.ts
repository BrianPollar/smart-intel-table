import { Column } from './column.define';
import { DataSet } from './data-set.define';
import { Row } from './row.define';

export const prepareValue = (value) => value;

// @dynamic
export class Cell {
  protected static prepareVal = prepareValue;
  newValue = '';

  constructor(
    protected value,
    protected row: Row,
    protected column,
    protected dataSet: DataSet
  ) {
    this.newValue = value;
  }

  getColumn(): Column {
    return this.column;
  }

  getRow(): Row {
    return this.row;
  }

  getValue() {
    const valid = this.column.getValuePrepareFunction() instanceof Function;
    const prepare = valid ? this.column.getValuePrepareFunction() : Cell.prepareVal;
    // eslint-disable-next-line no-useless-call
    return prepare.call(null, this.value, this.row.getData(), this);
  }

  setValue(value) {
    this.newValue = value;
  }

  getId(): string {
    return this.getColumn().id;
  }

  getTitle(): string {
    return this.getColumn().title;
  }

  isEditable(): boolean {
    if (this.getRow().index === -1) {
      return this.getColumn().isAddable;
    }
    else {
      return this.getColumn().isEditable;
    }
  }
}
