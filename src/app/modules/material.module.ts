import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatDividerModule } from '@angular/material';
import {  MatSidenavModule, MatListModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';

const  MaterialComponents = [
MatButtonModule,
MatIconModule,
MatDividerModule,
MatSidenavModule,
MatListModule,
MatToolbarModule,
MatSnackBarModule
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
