import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { EditCellDefault } from './edit-cell-default';

@Component({
  selector: 'table-cell-custom-editor',
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
})
export class CustomEditComponent 
  extends EditCellDefault 
  implements OnChanges, OnDestroy {
  customComponent;
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true }) dynamicTarget;

  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  ngOnChanges(
    changes: SimpleChanges
  ) {
    if (this.cell && !this.customComponent) {
      const componentFactory = this.resolver.resolveComponentFactory(this.cell.getColumn().editor.component);
      this.customComponent = this.dynamicTarget.createComponent(componentFactory);

      // set @Inputs and @Outputs of custom component
      this.customComponent.instance.cell = this.cell;
      this.customComponent.instance.inputClass = this.inputClass;
      this.customComponent.instance.stoppedEditingEvent.subscribe(() => this.stoppedEditingEvent());
      this.customComponent.instance.editedEvent.subscribe((event) => this.editedEvent(event));
      this.customComponent.instance.clickedEvent.subscribe((event) => this.clickedEvent(event));
    }
  }

  ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
  }
}
