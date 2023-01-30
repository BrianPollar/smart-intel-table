import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getDeepFromObject } from '../../helpers.define';
import { LocalDataSource } from '../local-data-source/local-data-source.define';
import { ServerSourceConf } from './server-data-source.conf';

export class ServerDataSource
  extends LocalDataSource {
  protected conf: ServerSourceConf;
  protected lastRequestCount = 0;

  constructor(
    protected http: HttpClient,
    conf: ServerSourceConf | object = {}) {
    super();

    this.conf = new ServerSourceConf(conf);

    if (!this.conf.endPoint) {
      throw new Error('At least endPoint must be specified as a configuration of the server data source.');
    }
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<unknown[]> {
    const observer$ = this.requestElements()
      .pipe(map(res => {
        this.lastRequestCount = this.extractTotalFromResponse(res);
        this.data = this.extractDataFromResponse(res);
        return this.data as unknown;
      }));
    return lastValueFrom(observer$) as Promise<unknown[]>;
  }

  /**
   * Extracts array of data from server response
   *
   * @param res
   * @returns
   */
  protected extractDataFromResponse(res): any[] {
    const rawData = res.body;
    const data = Boolean(this.conf.dataKey) ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;

    if (data instanceof Array) {
      return data;
    }

    throw new Error(`Data must be an array.
    Please check that data extracted from the server response by the key '${this.conf.dataKey}' exists and is array.`);
  }

  /**
   * Extracts total rows count from the server response
   * Looks for the count in the heders first, then in the response body
   *
   * @param res
   * @returns
   */
  protected extractTotalFromResponse(res): number {
    if (res.headers.has(this.conf.totalKey)) {
      return Number(res.headers.get(this.conf.totalKey));
    } else {
      const rawData = res.body;
      return getDeepFromObject(rawData, this.conf.totalKey, 0);
    }
  }

  protected requestElements(): Observable<any> {
    const httpParams = this.createRequesParams();
    return this.http.get(this.conf.endPoint, { params: httpParams, observe: 'response' });
  }

  protected createRequesParams(): HttpParams {
    let httpParams = new HttpParams();

    httpParams = this.addSortRequestParams(httpParams);
    httpParams = this.addFilterRequestParams(httpParams);
    return this.addPagerRequestParams(httpParams);
  }

  protected addSortRequestParams(httpParams: HttpParams): HttpParams {
    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        httpParams = httpParams.set(this.conf.sortFieldKey, fieldConf.field);
        httpParams = httpParams.set(this.conf.sortDirKey, fieldConf.direction.toUpperCase());
      });
    }

    return httpParams;
  }

  protected addFilterRequestParams(httpParams: HttpParams): HttpParams {
    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf) => {
        if (fieldConf.search) {
          httpParams = httpParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf.field), fieldConf.search);
        }
      });
    }

    return httpParams;
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
    if (this.pagingConf && this.pagingConf.page && this.pagingConf.perPage) {
      httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf.page);
      httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf.perPage);
    }

    return httpParams;
  }
}
