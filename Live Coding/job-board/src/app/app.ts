import { Component, computed, OnInit, signal } from '@angular/core';

type JobStory = {
  by: string;
  id: number;
  time: number;
  title: string;
  url?: string;
};

const JOBS_PER_PAGE = 6;
const JOB_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly errorMessage = signal('');
  protected readonly hasLoaded = signal(false);
  protected readonly jobs = signal<JobStory[]>([]);
  protected readonly loadedCount = signal(0);
  protected readonly visibleJobs = computed(() => this.jobs().slice(0, this.loadedCount()));

  async ngOnInit(): Promise<void> {
    await this.fetchJobs();
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

  private async fetchJobs(): Promise<void> {
    try {
      const storyIdsResponse = await fetch(JOB_STORIES_URL);

      if (!storyIdsResponse.ok) {
        throw new Error('Unable to load job postings.');
      }

      const storyIds = (await storyIdsResponse.json()) as number[];
      const jobPromises = storyIds.map(async (id) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

        if (!response.ok) {
          throw new Error('Unable to load job details.');
        }

        return (await response.json()) as JobStory;
      });

      const jobs = await Promise.all(jobPromises);
      this.jobs.set(jobs.filter((job) => !!job && !!job.title && !!job.by));
      this.loadedCount.set(Math.min(JOBS_PER_PAGE, this.jobs().length));
    } catch {
      this.errorMessage.set('Something went wrong while loading jobs.');
    } finally {
      this.hasLoaded.set(true);
    }
  }
}
