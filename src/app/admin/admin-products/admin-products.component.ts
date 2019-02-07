import {Component} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  public products: Product[];
  public filteredProducts: any[];
  public isLoaded = false;

  constructor(private productService: ProductService) {
    this.isLoaded = true;
    this.productService.getAllProducts()
      .subscribe((products) => {
        this.filteredProducts = this.products = products;
        this.isLoaded = false;
      });
  }

  filterProduct(query: string) {
    this.filteredProducts = query ?
      this.products
        .filter(p => p.title
          .toLowerCase()
          .includes(
            query.toLowerCase())) :
      this.products;
  }
}
