import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'smart-intel-table';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomServerDataSource
  extends LocalDataSource {
  lastRequestCount = 0;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<unknown[]> {
    // must return array ofr elements
    let url = 'https://jsonplaceholder.typicode.com/photos?';

    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        url += `_sort=${fieldConf.field}&_order=${fieldConf.direction.toUpperCase()}&`;
      });
    }

    if (this.pagingConf && this.pagingConf.page && this.pagingConf.perPage) {
      url += `_page=${this.pagingConf.page}&_limit=${this.pagingConf.perPage}&`;
    }

    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf) => {
        if (fieldConf.search) {
          url += `${fieldConf.field}_like=${fieldConf.search}&`;
        }
      });
    }

    const observer$ = this.http.get(url, { observe: 'response' })
      .pipe(
        map(res => {
          this.lastRequestCount = Number(res.headers.get('x-total-count'));
          return res.body as unknown;
        })
      );

    return lastValueFrom(observer$) as Promise<unknown[]>;
  }
}
