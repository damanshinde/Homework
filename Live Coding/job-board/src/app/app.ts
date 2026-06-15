import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from './models/job.model';
import { JobService } from './services/job.service';

const JOBS_PER_PAGE = 6;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  jobs = signal<Job[]>([]);
  visibleJobs = computed(() => this.jobs().slice(0, this.loadedCount()));
  errorMessage = signal('');
  isLoading = signal(false);

  private loadedCount = signal(0);
  private jobSubscription?: Subscription;

  constructor(private jobService: JobService) {}

  async ngOnInit(): Promise<void> {
    this.loadJobs();
  }

  protected formatDate(unixTime: number): string {
    return new Date(unixTime * 1000).toLocaleString();
  }

  protected loadMoreJobs(): void {
    if (!this.hasMoreJobs()) {
      return;
    }

    this.loadedCount.update((count) => Math.min(count + JOBS_PER_PAGE, this.jobs().length));
  }

  protected hasMoreJobs(): boolean {
    return this.loadedCount() < this.jobs().length;
  }

  ngOnDestroy(): void {
    this.jobSubscription?.unsubscribe();
  }

  private loadJobs(): void {
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.jobSubscription?.unsubscribe();

    this.jobSubscription = this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs.set(jobs);
        this.loadedCount.set(Math.min(JOBS_PER_PAGE, jobs.length));
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Something went wrong while loading jobs.');
        this.isLoading.set(false);
      }
    });
  }
}
