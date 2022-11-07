import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotRecordsComponent } from './not-records/not-records.component';



@NgModule({
  declarations: [
    NotRecordsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotRecordsComponent
  ]
})
export class SharedModule { }
