import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeColumnDirective } from './resizable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ResizeColumnDirective
  ],
  exports: [
    ResizeColumnDirective
  ]
})
export class DirectivesModule { }
