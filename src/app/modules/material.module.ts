import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatDividerModule, MatDivider} from '@angular/material';
import {  MatSidenavModule, MatListModule, MatToolbarModule } from '@angular/material';

const  MaterialComponents = [
MatButtonModule,
MatIconModule,
MatDividerModule,
MatSidenavModule,
MatListModule,
MatToolbarModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
