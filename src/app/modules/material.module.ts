import { NgModule } from '@angular/core';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
MatDialogModule,
MatChipsModule,
MatProgressSpinnerModule,
MatRippleModule,
MatButtonToggleModule
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
