import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  public id;
  public categories$;
  public product;
  public form: FormGroup;

  constructor(public categoryService: CategoryService,
              private productService: ProductService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private afStorage: AngularFireStorage
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
      ]),
      'price': new FormControl('', [
        Validators.required,
      ]),
      'description': new FormControl('', [
        Validators.required,
      ]),
      'size': new FormControl('', [
        Validators.required,
      ]),
      'category': new FormControl('', [
        Validators.required
      ]),
      'imageUrl': new FormControl('', [
        Validators.required
      ])
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id).valueChanges()
        .pipe(
          take(1)
        )
        .subscribe((data) => {
          console.log(data);
          this.product = data;
          this.form.get('title').setValue(this.product.title);
          this.form.get('price').setValue(this.product.price);
          this.form.get('description').setValue(this.product.description);
          this.form.get('size').setValue(this.product.size);
          this.form.get('category').setValue(this.product.category);
          this.form.get('imageUrl').setValue(this.product.imageUrl);
        });
    }
  }

  addProduct() {
    const dataFromForm = this.form.value;

    this.spinner.show();

    if (this.id) {
      this.productService.update(this.id, dataFromForm)
        .then(() => {
          this.spinner.hide();
          this.router.navigate(['/admin/products']);
        });
    } else {
      this.productService.addProductToDb(dataFromForm)
        .then(() => {
          this.spinner.hide();
          this.form.reset();
        });
    }
  }

  deleteProduct() {
    if (confirm('Are you sure?')) {
      this.spinner.show();
      this.productService.delete(this.id)
        .then(() => {
          this.router.navigate(['/admin/products']);
          this.spinner.hide();
        });
    }
  }
}
