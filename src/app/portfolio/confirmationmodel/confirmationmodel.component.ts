import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Transaction } from 'src/app/shared/models/Transaction';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-confirmationmodel',
  templateUrl: './confirmationmodel.component.html',
  styleUrls: ['./confirmationmodel.component.scss'],
})
export class ConfirmationmodelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
    public dialogRef: MatDialogRef<ConfirmationmodelComponent>,
    private portfolioService: PortfolioService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onClick(type: string) {
    this.spinner.show();

    if (type === 'yes') {
      this.portfolioService.deleteTransactionByPortfolioId(this.data).subscribe(
        (res) => {
          this.dialogRef.close(res);
          this.spinner.hide();
        },
        (err) => {
          //console.log(err);
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
        }
      );
    } else {
      this.dialogRef.close('Cancelled');
    }
  }
}
