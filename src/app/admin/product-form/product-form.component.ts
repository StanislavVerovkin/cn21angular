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
  public image;
  public imageSrc;

  constructor(public categoryService: CategoryService,
              private productService: ProductService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFireStorage
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
      'image': new FormControl('', [
        Validators.required
      ]),
      'firstImage': new FormControl('', [
        Validators.required
      ]),
      'secondImage': new FormControl('', [
        Validators.required
      ]),
      'thirdImage': new FormControl('', [
        Validators.required
      ]),
      'preOrder': new FormControl()
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id)
        .pipe(
          take(1)
        )
        .subscribe((data) => {
          this.product = data;
          this.form.get('title').setValue(this.product.title);
          this.form.get('price').setValue(this.product.price);
          this.form.get('description').setValue(this.product.description);
          this.form.get('size').setValue(this.product.size);
          this.form.get('category').setValue(this.product.category);
          this.form.get('preOrder').setValue(this.product.preOrder);
          this.form.get('image').setValue(this.product.image);
          this.form.get('firstImage').setValue(this.product.firstImage);
          this.form.get('secondImage').setValue(this.product.secondImage);
          this.form.get('thirdImage').setValue(this.product.thirdImage);
        });
    }
  }

  onSubmit(value) {
    this.spinner.show();
    if (this.id) {
      this.productService.updateProduct(this.id, value)
        .then(() => {
          this.spinner.hide();
        });
    } else {
      this.productService.addProductToDb(value)
        .then(() => {
          this.form.reset();
          this.router.navigate(['/admin/products']);
          this.spinner.hide();
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
