import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatDividerModule, MatDatepickerModule,  MatFormFieldModule } from '@angular/material';
import {  MatSidenavModule, MatListModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';

const  MaterialComponents = [
MatButtonModule,
MatIconModule,
MatDividerModule,
MatSidenavModule,
MatListModule,
MatToolbarModule,
MatSnackBarModule,
MatDatepickerModule,
MatFormFieldModule,
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
