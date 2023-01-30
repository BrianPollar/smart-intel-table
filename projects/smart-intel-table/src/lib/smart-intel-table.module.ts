import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CellModule } from './components/cell/cell.module';
import { FilterModule } from './components/filter/filter.module';
import { PagerModule } from './components/pager/pager.module';
import { TbodyModule } from './components/tbody/tbody.module';
import { TheadModule } from './components/thead/thead.module';
import { SmartIntelTableComponent } from './smart-intel-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    FilterModule,
    PagerModule,
    TbodyModule,
    TheadModule
  ],
  declarations: [
    SmartIntelTableComponent
  ],
  exports: [
    SmartIntelTableComponent
  ]
})
export class SmartIntelTableModule {
}
