export class Loan {
  id: number;
  paymentDate: any;
  remainingAmount: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  interestRate: number;

  constructor(id: number, paymentDate: any, remainingAmount: number, interestRate: number, totalPayment: number) {
    this.id = id;
    this.paymentDate = paymentDate;
    this.interestRate = interestRate;
    this.totalPayment = this.round(totalPayment, 2);
    this.remainingAmount = this.round(remainingAmount, 2);
    this.interestPayment = this.round(this.remainingAmount * interestRate, 2);
    this.principalPayment = this.round(this.totalPayment - this.interestPayment, 2);

  }

  round(value: number, digits: number): number {
    return Math.round(value * (10 ** digits)) / (10 ** digits)
  }

}
