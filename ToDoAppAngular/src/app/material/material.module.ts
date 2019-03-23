import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mat from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    mat.MatButtonModule,
    mat.MatCheckboxModule,
  ],
  exports: [mat.MatButtonModule, mat.MatCheckboxModule]
})
export class MaterialModule { }
