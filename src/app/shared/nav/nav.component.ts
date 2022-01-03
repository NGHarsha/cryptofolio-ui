import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { SigninComponent } from 'src/app/auth/signin/signin.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {}

  openSignInDialog() {
    const dialogRef = this.dialog.open(SigninComponent, {
      panelClass: 'dialog-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
    });
  }

  signout() {
    this.authService.signout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
