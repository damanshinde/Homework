import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Person {
  name: string;
  films: string[];
}

export interface Film {
  title: string;
  release_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private http = inject(HttpClient);
  private apiUrl = 'https://swapi.info/api/people';

  getPeople(name: string): Observable<Person | undefined> {
    return this.http.get<Person[]>(this.apiUrl).pipe(
      map((people) =>
        people.find((person) => person.name.toLowerCase() === name.toLowerCase())
      )
    );
  }

  getFilm(url: string): Observable<Film> {
    return this.http.get<Film>(url);
  }
}
