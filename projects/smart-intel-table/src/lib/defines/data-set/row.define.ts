import { Cell } from './cell.define';
import { Column } from './column.define';
import { DataSet } from './data-set.define';

export class Row {
  isSelected = false;
  isInEditing = false;
  cells: Cell[] = [];

  constructor(
    public index: number,
    protected data,
    protected dataSet: DataSet
  ) {
    this.process();
  }

  getCell(column: Column): Cell {
    return this.cells.find(el => el.getColumn() === column);
  }

  getCells() {
    return this.cells;
  }

  getData() {
    return this.data;
  }

  getIsSelected(): boolean {
    return this.isSelected;
  }

  getNewData() {
    const values = Object.assign({}, this.data);
    this.getCells().forEach((cell) => values[cell.getColumn().id] = cell.newValue);
    return values;
  }

  setData(data) {
    this.data = data;
    this.process();
  }

  process() {
    this.cells = [];
    this.dataSet.getColumns().forEach((column: Column) => {
      const cell = this.createCell(column);
      this.cells.push(cell);
    });
  }

  createCell(column: Column): Cell {
    const defValue = (column as any).settings.defaultValue ? (column as any).settings.defaultValue : '';
    const value = typeof this.data[column.id] === 'undefined' ? defValue : this.data[column.id];
    return new Cell(value, this, column, this.dataSet);
  }
}
