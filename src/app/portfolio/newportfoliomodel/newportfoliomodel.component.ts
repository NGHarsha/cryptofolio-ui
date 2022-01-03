import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-newportfoliomodel',
  templateUrl: './newportfoliomodel.component.html',
  styleUrls: ['./newportfoliomodel.component.scss'],
})
export class NewportfoliomodelComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewportfoliomodelComponent>,
    private portfolioService: PortfolioService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  onSubmit() {
    this.spinner.show();
    this.portfolioService.addPortfolio(this.transactionForm.value).subscribe(
      (res) => {
        //console.log(res);
        this.dialogRef.close(res);
        this.spinner.hide();
      },
      (err) => {
        //console.log(err);
        this.spinner.hide();
      }
    );
    this.spinner.hide();
  }
}
