export const compareValues = (direction: number, a: number, b: number) => {
  if (a < b) {
    return -1 * direction;
  }
  if (a > b) {
    return direction;
  }
  return 0;
};

export class LocalSorter {
  static sort(data: unknown[], field: string, direction: string, customCompare?: (...args) => number): unknown[] {
    const dir: number = (direction === 'asc') ? 1 : -1;
    const compare: (...args) => number = customCompare ? customCompare : compareValues;

    // return data.sort((a, b) => compare.call(null, dir, a[field], b[field])); // FIXME fallback to dis in cas direct call fails
    return data.sort((a, b) => compare(null, dir, a[field], b[field]));
  }
}
