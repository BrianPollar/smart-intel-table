export class ServerSourceConf {
  protected static readonly sortFieldKey = '_sort';
  protected static readonly sortDirKey = '_order';
  protected static readonly pagerPageKey = '_page';
  protected static readonly pagerLimitKey = '_limit';
  protected static readonly filterFieldKey = '#field#_like';
  protected static readonly totalKey = 'x-total-count';
  protected static readonly dataKey = '';
  endPoint: string;
  sortFieldKey: string;
  sortDirKey: string;
  pagerPageKey: string;
  pagerLimitKey: string;
  filterFieldKey: string;
  totalKey: string;
  dataKey: string;

  constructor({ endPoint = '',
    sortFieldKey = '',
    sortDirKey = '',
    pagerPageKey = '',
    pagerLimitKey = '',
    filterFieldKey = '',
    totalKey = '',
    dataKey = ''
  } = {}) {
    this.endPoint = endPoint ? endPoint : '';

    this.sortFieldKey = sortFieldKey ? sortFieldKey : ServerSourceConf.sortFieldKey;
    this.sortDirKey = sortDirKey ? sortDirKey : ServerSourceConf.sortDirKey;
    this.pagerPageKey = pagerPageKey ? pagerPageKey : ServerSourceConf.pagerPageKey;
    this.pagerLimitKey = pagerLimitKey ? pagerLimitKey : ServerSourceConf.pagerLimitKey;
    this.filterFieldKey = filterFieldKey ? filterFieldKey : ServerSourceConf.filterFieldKey;
    this.totalKey = totalKey ? totalKey : ServerSourceConf.totalKey;
    this.dataKey = dataKey ? dataKey : ServerSourceConf.dataKey;
  }
}
