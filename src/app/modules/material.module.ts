import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatDividerModule, MatDatepickerModule,  MatFormFieldModule, MatDialogModule } from '@angular/material';
import {  MatSidenavModule, MatListModule, MatToolbarModule, MatSnackBarModule, MatExpansionModule } from '@angular/material';

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
MatExpansionModule,
MatDialogModule
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
