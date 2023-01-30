import { TactionPosition, TtableMode, TtableSelectMode } from '../types/union.types';

export interface IsettingActions {
  columnTitle: string;
  add: boolean;
  edit: boolean;
  delete: boolean;
  custom: any[];
  position: TactionPosition; // left|right
}

export interface ItableFilter {
  inputClass: string;
}

export interface ItableEdit {
  inputClass: string;
  editButtonContent: string;
  saveButtonContent: string;
  cancelButtonContent: string;
  confirmSave: boolean;
}

export interface ItableAdd {
  inputClass: string;
  addButtonContent: string;
  createButtonContent: string;
  cancelButtonContent: string;
  confirmCreate: boolean;
}

export interface ItableDelete {
  deleteButtonContent: string;
  confirmDelete: boolean;
}

export interface ItableAttr {
  id: string;
  class: string;
}

export interface ItablePager {
  display: boolean;
  page: number;
  perPage: number;
}

export interface Isettings {
    mode: TtableMode; // inline|external|click-to-edit
    selectMode: TtableSelectMode; // single|multi
    /**
     * Points to an element in all data
     *
     * when < 0 all lines must be deselected
     */
    selectedRowIndex: number;
    switchPageToSelectedRowPage: boolean;
    hideHeader: boolean;
    hideSubHeader: boolean;
    resizable: boolean;
    actions: IsettingActions;
    filter: ItableFilter;
    edit: ItableEdit;
    add: ItableAdd;
    delete: ItableDelete;
    attr: ItableAttr;
    noDataMessage: string;
    columns: object;
    pager: ItablePager;
    rowClassFunction: () => '';
};
