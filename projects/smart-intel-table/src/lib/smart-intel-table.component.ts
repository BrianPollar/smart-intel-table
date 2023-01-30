/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Component, Input, Output, SimpleChange, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Row } from './defines/data-set/row.define';
import { DataSource } from './defines/data-source/data-source.define';
import { LocalDataSource } from './defines/data-source/local-data-source/local-data-source.define';
import { Grid } from './defines/grid.define';
import { deepExtend, getPageForRowIndex } from './defines/helpers.define';
import { Isettings } from './interfaces/general.interface';

@Component({
  selector: 'smart-intel-table',
  styleUrls: ['./smart-intel-table.component.scss'],
  templateUrl: './smart-intel-table.component.html'
})
export class SmartIntelTableComponent
implements OnChanges, OnDestroy {
  @Input() source;
  @Input() settings: Partial<Isettings> = {};
  @Output() rowSelect = new EventEmitter<any>();
  @Output() rowDeselect = new EventEmitter<any>();
  @Output() userRowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() deleteConfirm = new EventEmitter<any>();
  @Output() editConfirm = new EventEmitter<any>();
  @Output() createConfirm = new EventEmitter<any>();
  @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();
  tableClass: string;
  tableId: string;
  perPageSelect;
  isHideHeader: boolean;
  isHideSubHeader: boolean;
  isPagerDisplay: boolean;
  rowClassFunction: () => any;
  grid: Grid;
  defaultSettings: Partial<Isettings> = {
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    /**
     * Points to an element in all data
     *
     * when < 0 all lines must be deselected
     */
    selectedRowIndex: 0,
    switchPageToSelectedRowPage: false,
    hideHeader: false,
    hideSubHeader: false,
    resizable: true,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left' // left|right
    },
    filter: {
      inputClass: ''
    },
    edit: {
      inputClass: '',
      editButtonContent: 'Edit',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false
    },
    add: {
      inputClass: '',
      addButtonContent: 'Add New',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: false
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: false
    },
    attr: {
      id: '',
      class: ''
    },
    noDataMessage: 'No data found',
    columns: {},
    pager: {
      display: true,
      page: 1,
      perPage: 10
    },
    rowClassFunction: () => ''
  };
  isAllSelected = false;
  private onSelectRowSubscription: Subscription;
  private onDeselectRowSubscription: Subscription;
  private destroyed$: Subject<void> = new Subject<void>();

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.grid) {
      if (changes.settings) {
        this.grid.setSettings(this.prepareSettings());
      }
      if (changes.source) {
        this.source = this.prepareSource();
        this.grid.setSource(this.source);
      }
    } else {
      this.initGrid();
    }
    this.tableId = this.grid.getSetting('attr.id');
    this.tableClass = this.grid.getSetting('attr.class');
    this.isHideHeader = this.grid.getSetting('hideHeader');
    this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
    this.isPagerDisplay = this.grid.getSetting('pager.display');
    this.isPagerDisplay = this.grid.getSetting('pager.display');
    this.perPageSelect = this.grid.getSetting('pager.perPageSelect');
    this.rowClassFunction = this.grid.getSetting('rowClassFunction');
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  selectRow(index: number, switchPageToSelectedRowPage: boolean = this.grid.getSetting('switchPageToSelectedRowPage')): void {
    if (!this.grid) {
      return;
    }
    this.grid.settings.selectedRowIndex = index;
    if (this.isIndexOutOfRange(index)) {
      // we need to deselect all rows if we got an incorrect index
      this.deselectAllRows();
      return;
    }

    if (switchPageToSelectedRowPage) {
      const source: DataSource = this.source;
      const paging: { page: number; perPage: number } = source.getPaging();
      const page: number = getPageForRowIndex(index, paging.perPage);
      index %= paging.perPage;
      this.grid.settings.selectedRowIndex = index;

      if (page !== paging.page) {
        source.setPage(page);
        return;
      }
    }

    const row: Row = this.grid.getRows()[index];
    if (row) {
      this.onSelectRow(row);
    } else {
      // we need to deselect all rows if we got an incorrect index
      this.deselectAllRows();
    }
  }

  editRowSelect(row: Row) {
    if (this.grid.getSetting('selectMode') === 'multi') {
      this.onMultipleSelectRow(row);
    } else {
      this.onSelectRow(row);
    }
  }

  onUserSelectRow(row: Row) {
    if (this.grid.getSetting('selectMode') !== 'multi') {
      this.grid.selectRow(row);
      this.emitUserSelectRow(row);
      this.emitSelectRow(row);
    }
  }

  onRowHover(row: Row) {
    this.rowHover.emit(row);
  }

  multipleSelectRow(row: Row) {
    this.grid.multipleSelectRow(row);
    this.emitUserSelectRow(row);
    this.emitSelectRow(row);
  }

  onSelectAllRows($event) {
    this.isAllSelected = !this.isAllSelected;
    this.grid.selectAllRows(this.isAllSelected);

    this.emitUserSelectRow(null);
    this.emitSelectRow(null);
  }

  onSelectRow(row: Row) {
    this.grid.selectRow(row);
    this.emitSelectRow(row);
  }

  onMultipleSelectRow(row: Row) {
    this.emitSelectRow(row);
  }

  initGrid() {
    this.source = this.prepareSource();
    this.grid = new Grid(this.source, this.prepareSettings());

    this.subscribeToOnSelectRow();
    this.subscribeToOnDeselectRow();
  }

  prepareSource(): DataSource {
    if (this.source instanceof DataSource) {
      return this.source;
    } else if (this.source instanceof Array) {
      return new LocalDataSource(this.source);
    }

    return new LocalDataSource();
  }

  prepareSettings() {
    return deepExtend({}, this.defaultSettings, this.settings);
  }

  changePage($event) {
    this.resetAllSelector();
  }

  sort($event) {
    this.resetAllSelector();
  }

  filter($event) {
    this.resetAllSelector();
  }

  private deselectAllRows(): void {
    this.grid.dataSet.deselectAll();
    this.emitDeselectRow(null);
  }


  private resetAllSelector() {
    this.isAllSelected = false;
  }

  private emitUserSelectRow(row: Row) {
    const selectedRows = this.grid.getSelectedRows();

    this.userRowSelect.emit({
      data: row ? row.getData() : null,
      isSelected: row ? row.getIsSelected() : null,
      source: this.source,
      selected: selectedRows && selectedRows.length ? selectedRows.map((r: Row) => r.getData()) : []
    });
  }

  private emitSelectRow(row: Row) {
    const data = {
      data: row ? row.getData() : null,
      isSelected: row ? row.getIsSelected() : null,
      source: this.source
    };
    this.rowSelect.emit(data);
    if (!row?.isSelected) {
      this.rowDeselect.emit(data);
    }
  }

  private emitDeselectRow(row: Row): void {
    this.rowDeselect.emit({
      data: row ? row.getData() : null,
      isSelected: row ? row.getIsSelected() : null,
      source: this.source
    });
  }

  private isIndexOutOfRange(index: number): boolean {
    const dataAmount: number = this.source?.count();
    return index < 0 || (typeof dataAmount === 'number' && index >= dataAmount);
  }

  private subscribeToOnSelectRow(): void {
    if (this.onSelectRowSubscription) {
      this.onSelectRowSubscription.unsubscribe();
    }
    this.onSelectRowSubscription = this.grid.onSelectRow()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((row) => {
        this.emitSelectRow(row);
      });
  }

  private subscribeToOnDeselectRow(): void {
    if (this.onDeselectRowSubscription) {
      this.onDeselectRowSubscription.unsubscribe();
    }
    this.onDeselectRowSubscription = this.grid.onDeselectRow()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((row) => {
        this.emitDeselectRow(row);
      });
  }
}
