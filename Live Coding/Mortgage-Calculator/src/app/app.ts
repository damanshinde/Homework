import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

type MortgageResults = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

@Component({
  selector: 'app-root',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  loanAmountInput = '350000';
  interestRateInput = '6.5';
  loanTermInput = '30';

  protected readonly errorMessage = signal('');
  protected readonly results = signal<MortgageResults | null>(null);

  calculate(): void {
    const loanAmount = this.parsePositiveNumber(this.loanAmountInput, 'loan amount');
    const annualRate = this.parsePositiveNumber(this.interestRateInput, 'interest rate');
    const loanTermYears = this.parsePositiveNumber(this.loanTermInput, 'loan term');

    if (loanAmount === null || annualRate === null || loanTermYears === null) {
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    if (!Number.isInteger(totalPayments) || totalPayments <= 0) {
      this.setError('Enter a valid loan term in years greater than 0.');
      return;
    }

    const monthlyPayment = monthlyRate === 0
      ? loanAmount / totalPayments
      : loanAmount * ((monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1));

    if (!Number.isFinite(monthlyPayment)) {
      this.setError('Unable to calculate the mortgage with the provided values.');
      return;
    }

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;

    this.errorMessage.set('');
    this.results.set({
      monthlyPayment: this.roundToTwo(monthlyPayment),
      totalPayment: this.roundToTwo(totalPayment),
      totalInterest: this.roundToTwo(totalInterest)
    });
  }

  resetCalculator(form: NgForm): void {
    form.resetForm({
      loanAmount: '',
      interestRate: '',
      loanTerm: ''
    });
    this.errorMessage.set('');
    this.results.set(null);
  }

  private parsePositiveNumber(value: string, fieldName: string): number | null {
    const parsedValue = Number(value);

    if (value.trim() === '' || Number.isNaN(parsedValue)) {
      this.setError(`Enter a numeric ${fieldName}.`);
      return null;
    }

    if (parsedValue <= 0) {
      this.setError(`Enter a ${fieldName} greater than 0.`);
      return null;
    }

    return parsedValue;
  }

  private roundToTwo(value: number): number {
    return Math.round(value * 100) / 100;
  }

  private setError(message: string): void {
    this.errorMessage.set(message);
    this.results.set(null);
  }
}
