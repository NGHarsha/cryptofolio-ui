import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { SignupComponent } from '../signup/signup.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SigninComponent>,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  loginForm: FormGroup;
  isLoading: boolean;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onClick() {
    console.log('Clicked');
  }

  onSubmit() {
    this.spinner.show();
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    this.authService.performAuth('signin', email, password).subscribe(
      (res) => {
        this.dialogRef.close(res.body);
        this.authService.saveUser(res.body);
        this.authService.getUser();
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        if (!err.message) {
          this.snackBar.open('Something went wrong', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snack',
            duration: 5000,
          });
        } else {
          this.snackBar.open(err.message, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snack',
            duration: 5000,
          });
        }
        this.spinner.hide();
      }
    );
  }

  openSignUpDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(SignupComponent, {
      panelClass: 'dialog-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
