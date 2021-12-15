import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './nav/nav.component';
import { MainRoutingModule } from '../main/main-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MainRoutingModule,
    AppRoutingModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NavComponent,
    NgxSpinnerModule,
  ],
  declarations: [NavComponent],
})
export class SharedModule {}
