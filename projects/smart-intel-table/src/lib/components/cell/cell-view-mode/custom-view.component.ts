import {
  Component,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Cell } from '../../../defines/data-set/cell.define';
import { IviewCell } from './view-cell';

@Component({
  selector: 'custom-view-component',
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
})
export class CustomViewComponent 
implements OnInit, OnDestroy {
  customComponent;
  @Input() cell: Cell;
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    if (this.cell && !this.customComponent) {
      this.createCustomComponent();
      this.callOnComponentInit();
      this.patchInstance();
    }
  }

  ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }

  protected createCustomComponent() {
    const componentFactory = this.resolver.resolveComponentFactory(this.cell.getColumn().renderComponent);
    this.customComponent = this.dynamicTarget.createComponent(componentFactory);
  }

  protected callOnComponentInit() {
    const onComponentInitFunction = this.cell.getColumn().getOnComponentInitFunction();
    // TODO onComponentInitFunction && onComponentInitFunction(this.customComponent.instance);
    onComponentInitFunction && onComponentInitFunction();
  }

  protected patchInstance() {
    Object.assign(this.customComponent.instance, this.getPatch());
  }

  protected getPatch(): IviewCell {
    return {
      value: this.cell.getValue(),
      rowData: this.cell.getRow().getData()
    }
  }
}
