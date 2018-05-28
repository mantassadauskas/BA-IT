import {Component, OnInit} from '@angular/core';
import {Loan} from "../../models/Loan";
import {FormControl, Validators} from '@angular/forms';
import {debounceTime} from "rxjs/internal/operators";
import {DatepickerOptions} from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {
  amount: FormControl;
  years: FormControl;
  interestRate: FormControl;
  payment: number | string;
  totalPayment: number;
  loanData: Loan[];
  date: Date;
  totalInterest: number;
  totalInterestRounded: number;
  loanSize: number;
  remainingAmount: number[];
  show: boolean;
  options: DatepickerOptions = {

    locale: enLocale,
  };

  constructor() {
    this.date = new Date();
    this.loanData = [];
    this.remainingAmount = [];
    this.totalInterest = 0;
    this.totalInterestRounded = 0;
    this.show = false;
  }

  ngOnInit() {
    this.amount = new FormControl('', [Validators.required, Validators.min(1)]);
    this.amount.setValue(10000);
    this.interestRate = new FormControl('', [Validators.required, Validators.min(1)]);
    this.interestRate.setValue(7);
    this.years = new FormControl('', [Validators.required, Validators.min(1)]);
    this.years.setValue(2);
    this.amount.valueChanges.pipe(debounceTime(1)).subscribe({
      next: (value: any) => {
        this.calc();

      }
    });
    this.years.valueChanges.pipe(debounceTime(1)).subscribe({
      next: (value: any) => {
        this.calc();

      }
    });
    this.interestRate.valueChanges.pipe(debounceTime(1)).subscribe({
      next: (value: any) => {
        this.calc();
      }
    });

    this.calc();

  }

  calc(): void {
    this.totalInterestRounded = 0;
    let loanDate = new Date(this.date);
    this.totalInterest = 0;
    this.loanData = [];
    this.loanSize = this.amount.value;
    let leftPeriods = this.years.value * 12;
    let months = this.years.value * 12;
    let annuityFactor = (this.interestRate.value / 1200 * Math.pow(1 + this.interestRate.value / 1200, months)) / ((Math.pow(1 + this.interestRate.value / 1200, months) - 1));
    this.payment = this.round(this.amount.value * annuityFactor, 2);

    for (let i = 0; i < this.years.value * 12; i++) {

      annuityFactor = (this.interestRate.value / 1200 * Math.pow(1 + this.interestRate.value / 1200, leftPeriods)) / ((Math.pow(1 + this.interestRate.value / 1200, leftPeriods) - 1));
      this.totalPayment = this.loanSize * annuityFactor;
      leftPeriods--;

      loanDate.setMonth(loanDate.getMonth() + 1);
      let shortDate = loanDate.toLocaleDateString("en-US");

      this.loanData.push(new Loan(i + 1, shortDate, this.loanSize, this.interestRate.value / 1200, this.totalPayment));
      this.loanSize += -this.totalPayment + this.loanSize * this.interestRate.value / 1200;
      this.remainingAmount.push(this.loanSize);
      this.totalInterest += this.loanSize * this.interestRate.value / 1200;

    }
    this.totalInterestRounded = this.round(this.totalInterest, 2);
  }

  showToggle(): void {
    this.show = !this.show;
  }

  round(value: number, digits: number): number {
    return Math.round(value * (10 ** digits)) / (10 ** digits)
  }

}
