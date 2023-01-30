import { DataSet } from './data-set.define';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Column {
  title = '';
  type = '';
  class = '';
  width = '';
  hide = false;
  isSortable = false;
  isEditable = true;
  isAddable = true;
  isFilterable = false;
  sortDirection = '';
  defaultSortDirection = '';
  editor: { type: string; config; component } = { type: '', config: {}, component: null };
  filter: { type: string; config; component } = { type: '', config: {}, component: null };
  renderComponent = null;
  compareFunction: () => any;
  valuePrepareFunction: () => any;
  filterFunction: () => any;
  onComponentInitFunction: () => any;

  constructor(
    public id: string,
    protected settings,
    protected dataSet: DataSet
  ) {
    this.process();
  }

  getOnComponentInitFunction() {
    return this.onComponentInitFunction;
  }

  getCompareFunction() {
    return this.compareFunction;
  }

  getValuePrepareFunction() {
    return this.valuePrepareFunction;
  }

  getFilterFunction() {
    return this.filterFunction;
  }

  getConfig() {
    return this.editor && this.editor.config;
  }

  getFilterType() {
    return this.filter && this.filter.type;
  }

  getFilterConfig() {
    return this.filter && this.filter.config;
  }

  prepareType(): string {
    return this.settings.type || this.determineType();
  }

  prepareSortDirection(): string {
    return this.settings.sort === 'desc' ? 'desc' : 'asc';
  }

  determineType(): string {
    // TODO: determine type by data
    return 'text';
  }

  protected process() {
    this.title = this.settings.title;
    this.class = this.settings.class;
    this.width = this.settings.width;
    this.hide = Boolean(this.settings.hide);
    this.type = this.prepareType();
    this.editor = this.settings.editor;
    this.filter = this.settings.filter;
    this.renderComponent = this.settings.renderComponent;

    this.isFilterable = typeof this.settings.filter === 'undefined' ? true : Boolean(this.settings.filter);
    this.defaultSortDirection = ['asc', 'desc']
      .indexOf(this.settings.sortDirection) !== -1 ? this.settings.sortDirection : '';
    this.isSortable = typeof this.settings.sort === 'undefined' ? true : Boolean(this.settings.sort);
    this.isEditable = typeof this.settings.editable === 'undefined' ? true : Boolean(this.settings.editable);
    this.isAddable = typeof this.settings.addable === 'undefined' ? true : Boolean(this.settings.addable);
    this.sortDirection = this.prepareSortDirection();

    this.compareFunction = this.settings.compareFunction;
    this.valuePrepareFunction = this.settings.valuePrepareFunction;
    this.filterFunction = this.settings.filterFunction;
    this.onComponentInitFunction = this.settings.onComponentInitFunction;
  }
}
