import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SignupComponent>,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.spinner.show();

    let name = this.signupForm.get('name')?.value;
    let email = this.signupForm.get('email')?.value;
    let password = this.signupForm.get('password')?.value;

    this.authService.performAuth('signup', email, password, name).subscribe(
      (res) => {
        this.dialogRef.close(res.body);
        this.authService.saveUser(res.body);
        this.authService.getUser();
        this.spinner.hide();
      },
      (err) => {
        console.log(err.message);
        this.snackBar.open(err.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'error-snack',
          duration: 5000,
        });
        this.spinner.hide();
      }
    );
  }

  onClick() {
    console.log('Clicked');
  }

  openSignInDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(SigninComponent, {
      panelClass: 'dialog-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
