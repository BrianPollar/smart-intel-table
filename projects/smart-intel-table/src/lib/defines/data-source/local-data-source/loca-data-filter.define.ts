/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterValues = (value: string, search: string) => value.toString().toLowerCase().includes(search.toString().toLowerCase());

export class LocalFilter {
  static filter(data: unknown[], field: string, search: string, customFilter?: (...args) => unknown): unknown[] {
    const filter: (...args) => any = customFilter ? customFilter : filterValues;

    return data.filter((el) => {
      const value = typeof el[field] === 'undefined' || el[field] === null ? '' : el[field];
      // return filter.call(null, value, search); // FIXME just fallback dis in case direct call not working
      return filter(null, value, search);
    });
  }
}
