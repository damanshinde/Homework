import { Component, signal } from '@angular/core';
import { StarWarSearch } from './star-war-search/star-war-search';

@Component({
  selector: 'app-root',
  imports: [StarWarSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('star-wars');
}
