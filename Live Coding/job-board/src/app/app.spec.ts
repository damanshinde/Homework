import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    httpTestingController.expectOne('https://hacker-news.firebaseio.com/v0/jobstories.json').flush([1]);
    httpTestingController.expectOne('https://hacker-news.firebaseio.com/v0/item/1.json').flush({
      by: 'tester',
      id: 1,
      time: 1683838872,
      title: 'Test job',
      url: 'https://example.com/job'
    });

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the board heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    httpTestingController.expectOne('https://hacker-news.firebaseio.com/v0/jobstories.json').flush([1]);
    httpTestingController.expectOne('https://hacker-news.firebaseio.com/v0/item/1.json').flush({
      by: 'tester',
      id: 1,
      time: 1683838872,
      title: 'Test job',
      url: 'https://example.com/job'
    });

    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hacker News Jobs Board');
  });
});
