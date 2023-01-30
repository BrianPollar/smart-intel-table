/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

export abstract class DataSource {
  protected onChangedSource = new Subject<any>();
  protected onAddedSource = new Subject<any>();
  protected onUpdatedSource = new Subject<any>();
  protected onRemovedSource = new Subject<any>();

  refresh() {
    this.emitOnChanged('refresh');
  }

  load(data: unknown[]): Promise<any> {
    this.emitOnChanged('load');
    return Promise.resolve();
  }

  onChanged(): Observable<any> {
    return this.onChangedSource.asObservable();
  }

  onAdded(): Observable<any> {
    return this.onAddedSource.asObservable();
  }

  onUpdated(): Observable<any> {
    return this.onUpdatedSource.asObservable();
  }

  onRemoved(): Observable<any> {
    return this.onRemovedSource.asObservable();
  }

  prepend(element): Promise<any> {
    this.emitOnAdded(element);
    this.emitOnChanged('prepend');
    return Promise.resolve();
  }

  append(element): Promise<any> {
    this.emitOnAdded(element);
    this.emitOnChanged('append');
    return Promise.resolve();
  }

  add(element): Promise<any> {
    this.emitOnAdded(element);
    this.emitOnChanged('add');
    return Promise.resolve();
  }

  remove(element): Promise<any> {
    this.emitOnRemoved(element);
    this.emitOnChanged('remove');
    return Promise.resolve();
  }

  update(element, values): Promise<any> {
    this.emitOnUpdated(element);
    this.emitOnChanged('update');
    return Promise.resolve();
  }

  empty(): Promise<any> {
    this.emitOnChanged('empty');
    return Promise.resolve();
  }

  setSort(conf: any[], doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('sort');
    }
  }

  setFilter(conf: any[], andOperator?: boolean, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('filter');
    }
  }

  addFilter(fieldConf: object, andOperator?: boolean, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('filter');
    }
  }

  setPaging(page: number, perPage: number, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('paging');
    }
  }

  setPage(page: number, doEmit?: boolean) {
    if (doEmit) {
      this.emitOnChanged('page');
    }
  }

  protected emitOnRemoved(element) {
    this.onRemovedSource.next(element);
  }

  protected emitOnUpdated(element) {
    this.onUpdatedSource.next(element);
  }

  protected emitOnAdded(element) {
    this.onAddedSource.next(element);
  }

  protected emitOnChanged(action: string) {
    this.getElements().then((elements) => this.onChangedSource.next({
      action,
      elements,
      paging: this.getPaging(),
      filter: this.getFilter(),
      sort: this.getSort()
    }));
  }

  abstract getAll(): Promise<any>;
  abstract getElements(): Promise<any>;
  abstract getSort();
  abstract getFilter();
  abstract getPaging();
  abstract count(): number;
}
