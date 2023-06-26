import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appOnlynumber]'
})
export class OnlynumberDirective {

  constructor(private eRef: ElementRef) {
  }
  static pagination(res: any, data: any): void {
    let count, add, total = 0, size = 0;
    count = res;
    if (data.pageSizes.length === 0) {
      if (count >= 10) {
        data.pageSizes.push(10);
        if (data.size !== 10) {
          data.pageSizes.push(data.size);
        }
      }
      for (let i = 0; i < 4; i++) {
        add = Math.ceil((10 + count) / 10);
        add = Math.ceil((add / 10)) * 20;
        total = total + add;
        if (total >= count) {
          break;
        } else {
          data.pageSizes.push(total);
        }
      }
      data.pageSizes.push(count);
    } else {
      data.pageSizes = [];
      if (count >= 10) {
        data.pageSizes.push(10);
        if (data.size !== 10) {
          data.pageSizes.push(data.size);
        }
      }
      for (let i = 0; i < 4; i++) {
        add = Math.ceil((10 + count) / 10);
        add = Math.ceil((add / 10)) * 20;
        total = total + add;
        if (total >= count) {
          break;
        } else {
          data.pageSizes.push(total);
        }
      }
      data.pageSizes.push(count);
    }
    data.pageSizes = [...new Set(data.pageSizes)];
    data.pageSizes.sort((a: any, b: any) => a - b);
    size = data.pageSizes.length;
  }
}
