import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = async (input: string | URL | Request) => {
      const url = String(input);

      if (url.endsWith('/jobstories.json')) {
        return new Response(JSON.stringify([1]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(
        JSON.stringify({
          by: 'tester',
          id: 1,
          time: 1683838872,
          title: 'Test job',
          type: 'job',
          url: 'https://example.com/job'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    };
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the board heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hacker News Jobs Board');
  });
});
