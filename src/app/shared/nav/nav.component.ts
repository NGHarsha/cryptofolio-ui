import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from 'src/app/auth/signin/signin.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openSignInDialog() {
    const dialogRef = this.dialog.open(SigninComponent, {
      panelClass: 'dialog-class',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
