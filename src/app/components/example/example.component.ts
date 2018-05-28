import {Component, OnInit} from '@angular/core';
import {Loan} from "../../models/Loan";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  loanSize: number;
  loanSize2: number;
  remainingAmount: number[];
  totalPayment: number;
  interestRate: number;
  periodsAmount: number;
  loanData: Loan[];
  loanDataChangedInterestRate: Loan[];


  constructor() {

    this.loanSize = 10000;
    this.loanSize2 = this.loanSize;
    this.remainingAmount = [];
    this.interestRate = 7 / 1200;
    this.periodsAmount = 26;
    this.remainingAmount.push(this.loanSize);
    this.loanData = [];
    this.loanDataChangedInterestRate = [];

  }

  ngOnInit() {
    this.loanCalc();
    this.ChangedInterestRateCalc();

  }

  csv() {
    let csvContent = 'paymentId, paymentDate, remainingAmount, principalPayment, interestPayment, totalPayment, interestRate \n';
    for (let i = 0; i < this.loanData.length; i++) {
      csvContent += this.loanData[i].id + ', ' + this.loanData[i].paymentDate + ', ' + this.loanData[i].remainingAmount + ', ' + this.loanData[i].principalPayment + ', ' + this.loanData[i].interestPayment + ', ' + this.loanData[i].totalPayment + ', ' + this.loanData[i].interestRate * 1200 + '\n';


    }

    let download = function (csvContent, fileName, mimeType) {
      let a = document.createElement('a');
      mimeType = mimeType || 'application/octet-stream';

      if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([csvContent], {
          type: mimeType
        }), fileName);
      } else if (URL && 'download' in a) { //html5 A[download]
        a.href = URL.createObjectURL(new Blob([csvContent], {
          type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        location.href = 'data:application/octet-stream,' + encodeURIComponent(csvContent); // only this mime type is supported
      }
    };

    download(csvContent, 'loanCalculation.csv', 'text/csv;encoding:utf-8');
  };

  csv2() {
    let csvContent2 = 'paymentId, paymentDate, remainingAmount, principalPayment, interestPayment, totalPayment, interestRate \n';
    for (let i = 0; i < this.loanDataChangedInterestRate.length; i++) {
      csvContent2 += this.loanDataChangedInterestRate[i].id + ', ' + this.loanDataChangedInterestRate[i].paymentDate + ', ' + this.loanDataChangedInterestRate[i].remainingAmount + ', ' + this.loanDataChangedInterestRate[i].principalPayment + ', ' + this.loanDataChangedInterestRate[i].interestPayment + ', ' + this.loanDataChangedInterestRate[i].totalPayment + ', ' + this.loanDataChangedInterestRate[i].interestRate * 1200 + '\n';


    }

    let download = function (csvContent, fileName, mimeType) {
      let a = document.createElement('a');
      mimeType = mimeType || 'application/octet-stream';

      if (navigator.msSaveBlob) { // IE10
        navigator.msSaveBlob(new Blob([csvContent2], {
          type: mimeType
        }), fileName);
      } else if (URL && 'download' in a) { //html5 A[download]
        a.href = URL.createObjectURL(new Blob([csvContent2], {
          type: mimeType
        }));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        location.href = 'data:application/octet-stream,' + encodeURIComponent(csvContent2); // only this mime type is supported
      }
    };

    download(csvContent2, 'modifiedInterestRate.csv', 'text/csv;encoding:utf-8');
  };


  loanCalc(): void {
    this.loanData = [];

    let loanDate = new Date();
    let leftPeriods = this.periodsAmount;

    for (let i = 0; i < this.periodsAmount; i++) {

      let annuityFactor = (this.interestRate * Math.pow(1 + this.interestRate, leftPeriods)) / ((Math.pow(1 + this.interestRate, leftPeriods) - 1));
      this.totalPayment = this.loanSize * annuityFactor;
      leftPeriods--;
      loanDate.setMonth(loanDate.getMonth() + 1);
      let shortDate = loanDate.toLocaleDateString("en-US");
      this.loanData.push(new Loan(i + 1, shortDate, this.loanSize, this.interestRate, this.totalPayment));
      this.loanSize += -this.totalPayment + this.loanSize * this.interestRate;
      this.remainingAmount.push(this.loanSize);

    }
  }


  ChangedInterestRateCalc(): void {
    this.loanDataChangedInterestRate = [];

    let loanDate = new Date();
    let leftPeriods = this.periodsAmount;
    for (let i = 0; i < this.periodsAmount; i++) {
      if (i > 12) {
        this.interestRate = 12 / 1200;
      }
      let annuityFactor = (this.interestRate * Math.pow(1 + this.interestRate, leftPeriods)) / ((Math.pow(1 + this.interestRate, leftPeriods) - 1));
      this.totalPayment = this.loanSize2 * annuityFactor;
      leftPeriods--;
      loanDate.setMonth(loanDate.getMonth() + 1);
      let shortDate = loanDate.toLocaleDateString("en-US");
      this.loanDataChangedInterestRate.push(new Loan(i + 1, shortDate, this.loanSize2, this.interestRate, this.totalPayment));
      this.loanSize2 += -this.totalPayment + this.loanSize2 * this.interestRate;
      this.remainingAmount.push(this.loanSize2);

    }
  }
}
