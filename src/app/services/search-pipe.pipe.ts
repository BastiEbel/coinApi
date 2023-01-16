import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(items: any, search: string, excludes: any = []): any {
    if (!search || !items) return items;
    return SearchPipePipe.filter(items, search, excludes);
  }

  static filter(
    items: Array<{ [key: string]: any }>,
    search: string,
    excludes: any
  ): Array<{ [key: string]: any }> {
    const toCompare = search.toLowerCase();

    function checkInside(item: any, search: string) {
      if (
        typeof item === 'string' &&
        item.toString().toLowerCase().includes(toCompare)
      ) {
        return true;
      }

      for (let property in item) {
        if (
          item[property] === null ||
          item[property] == undefined ||
          excludes.includes(property)
        ) {
          continue;
        }

        if (typeof item[property] === 'object') {
          if (checkInside(item[property], search)) {
            return true;
          }
        } else if (
          item[property].toString().toLowerCase().includes(toCompare)
        ) {
          return true;
        }
      }
      return false;
    }

    return items.filter(function (item) {
      return checkInside(item, search);
    });
  }
}
