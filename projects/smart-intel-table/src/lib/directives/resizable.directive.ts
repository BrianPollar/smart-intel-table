import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[smartResizeColumn]'
})
export class ResizeColumnDirective
implements OnInit {
  // Whether column need resizing or not
  @Input('smartResizeColumn') resizable: boolean;
  @Input() index: number;
  private startX: number;
  private startWidth: number;
  private column: HTMLElement;
  private table: HTMLElement;
  private pressed: boolean;
  private resizer: HTMLElement;
  private heightMade: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.column = this.el.nativeElement;
  }

  ngOnInit() {
    if (this.resizable) {
      /** const row = this.renderer.parentNode(this.column);
      const thead = this.renderer.parentNode(row);
      this.table = this.renderer.parentNode(thead);*/
      const row = this.renderer.parentNode(this.column);
      const thead = this.renderer.parentNode(row);
      this.table = this.renderer.parentNode(thead);
      // we will add this element as a marker for triggering resize.
      this.resizer = this.renderer.createElement('div');
      this.renderer.addClass(this.resizer, 'resize-holder');
      this.renderer.appendChild(this.column, this.resizer);
      this.renderer.addClass(this.column, 'disp-flex');

      this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown);
      this.renderer.listen(this.table, 'mousemove', this.onMouseMove);
      this.renderer.listen('document', 'mouseup', this.onMouseUp);

      this.renderer.listen(this.table, 'mouseover', this.tableHover);
    }
  }

  onMouseDown = (event: MouseEvent) => {
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth;
  };

  onMouseMove = (event: MouseEvent) => {
    const offset = 35;
    if (this.pressed && event.buttons) {
      this.renderer.addClass(this.table, 'resizing');
      // Calculate width of column
      const width = this.startWidth - (event.pageX - this.startX - offset);
      /** const tableCells = Array
        .from(this.table.querySelectorAll('.smart-table-row'))
        .map((row: any) => row.querySelectorAll('.mat-cell')
          .item(this.index));**/

      const tableCells = Array
        .from(this.table.querySelectorAll('.smart-table-row'))
        .map((row: any) => row.getElementsByTagName('td')
          .item(this.index));
      // Set table header width
      this.renderer.setStyle(this.column, 'width', `${width}px`);
      // Set table cells width
      for (const cell of tableCells) {
        this.renderer.setStyle(cell, 'width', `${width}px`);
      }
    }
  };

  tableHover = (event: MouseEvent) => {
    if (this.heightMade) {
      // return;
    }
    this.heightMade = true;
    if (this.resizer && this.renderer) {
      this.renderer.setStyle(this.resizer, 'height', `${this.getTableHeight()}px`);
    }
  };

  getTableHeight() {
    return this.table.clientHeight;
  }

  onMouseUp = (event: MouseEvent) => {
    if (this.pressed) {
      this.pressed = false;
      this.renderer.removeClass(this.table, 'resizing');
    }
  };
}
