import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

  public id;
  public categories$;
  public sizes$;
  public product;
  public image;

  public form: FormGroup;
  public fb = new FormBuilder();

  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public categoryService: CategoryService,
              private productService: ProductService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
    this.categories$ = categoryService.getCategories();
    this.sizes$ = productService.getSizes();
  }

  ngOnInit() {
    this.form = this.fb.group({
        'title': new FormControl('', [
          Validators.required,
        ]),
        'price': new FormControl('', [
          Validators.required,
        ]),
        'description': new FormControl('', [
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
        'availableSizes': this.fb.array([]),
        'preOrder': new FormControl()
      }
    );

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id)
        .pipe(
          take(1)
        )
        .subscribe((data) => {
          this.product = data;
          this.form.patchValue({
            title: this.product.title,
            price: this.product.price,
            description: this.product.description,
            category: this.product.category,
            preOrder: this.product.preOrder,
            image: this.product.image,
            firstImage: this.product.firstImage,
            secondImage: this.product.secondImage,
            thirdImage: this.product.thirdImage,
          });
          this.form.setControl('availableSizes', this.fb.array(this.product.availableSizes));
        });
    }
  }


  get availableSizes(): FormArray {
    return this.form.get('availableSizes') as FormArray;
  }

  addSize(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.availableSizes.value.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeSize(size): void {
    const index = this.availableSizes.value.indexOf(size);

    if (index >= 0) {
      this.availableSizes.value.splice(index, 1);
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
