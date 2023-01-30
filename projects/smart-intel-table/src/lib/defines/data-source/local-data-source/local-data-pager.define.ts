export class LocalPager {
  static paginate(data: unknown[], page: number, perPage: number): unknown[] {
    return data.slice(perPage * (page - 1), perPage * page);
  }
}
