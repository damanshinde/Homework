import { Component, signal } from '@angular/core';
import { ProductsComponent } from './products-component/products-component';

@Component({
  selector: 'app-root',
  imports: [ProductsComponent],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('test');
}
