import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film, PeopleService } from './../people-service';

interface FilmRow {
  title: string;
  year: string;
}

@Component({
  selector: 'app-star-war-search',
  imports: [FormsModule],
  templateUrl: './star-war-search.html',
  styleUrl: './star-war-search.scss',
})
export class StarWarSearch {
  characterName = '';
  films: FilmRow[] = [];
  searchedCharacter = '';

  private peopleService = inject(PeopleService);

  onSubmit() {
    const name = this.characterName.trim();

    this.films = [];
    this.searchedCharacter = name;

    if (!name) {
      return;
    }

    this.peopleService.getPeople(name).subscribe((person) => {
      if (!person) {
        return;
      }

      for (let i = 0; i < person.films.length; i++) {
        const apiUrl = person.films[i];

        this.peopleService.getFilm(apiUrl).subscribe((film: Film) => {
          this.films.push({
            title: film.title,
            year: film.release_date.slice(0, 4),
          });
          this.films.sort((firstFilm, secondFilm) =>
            firstFilm.year.localeCompare(secondFilm.year)
          );
        });
      }
    });
  }
}
