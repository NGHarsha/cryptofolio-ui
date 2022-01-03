import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    JwtModule,
  ],
})
export class AuthModule {}
