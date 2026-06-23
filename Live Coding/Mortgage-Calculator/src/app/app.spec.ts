import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the calculator heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Mortgage loan');
  });

  it('should calculate mortgage results', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.loanAmountInput = '300000';
    app.interestRateInput = '6';
    app.loanTermInput = '30';

    app.calculate();

    expect(app['results']()).toEqual({
      monthlyPayment: 1798.65,
      totalPayment: 647514.57,
      totalInterest: 347514.57
    });
  });

  it('should show an error for non-numeric input', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.loanAmountInput = 'abc';
    app.interestRateInput = '6';
    app.loanTermInput = '30';

    app.calculate();

    expect(app['errorMessage']()).toContain('Enter a numeric loan amount.');
  });
});
