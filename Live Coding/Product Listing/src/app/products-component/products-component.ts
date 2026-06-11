import { Product, ProductService } from './../product-service';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-products-component',
  imports: [],
  templateUrl: './products-component.html',
})
export class ProductsComponent implements OnInit{
  private readonly productService = inject(ProductService);

  protected readonly products = signal<Product[]>([]);
  protected readonly errorMessage = signal('');

  ngOnInit(){
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.products);
        this.errorMessage.set('');
      },
      error: () => {
        this.errorMessage.set('Unable to load products');
        this.products.set([]);
      },
    });
  }

}
