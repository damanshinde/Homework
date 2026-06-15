import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Job } from '../models/job.model';

const JOB_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/jobstories.json';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);

  getJobs(): Observable<Job[]> {
    return this.http.get<number[]>(JOB_STORIES_URL).pipe(
      switchMap((ids) =>
        forkJoin(ids.map((id) => this.http.get<Job>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)))
      ),
      map((jobs) => jobs.filter((job) => !!job?.title && !!job?.by))
    );
  }
}
