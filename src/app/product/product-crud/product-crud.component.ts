import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../core/models/object-model';
import { CustomerService } from 'src/app/customer/services/customer.service';
declare var jQuery: any;

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent implements OnInit {
  all_product_data;
  addEditProductForm: FormGroup;
  addEditProduct: boolean = false;//for form validation
  popup_header: string;
  add_product: boolean;
  edit_product: boolean;

  product_data;
  product_dto: Product;

  single_product_data;
  edit_product_id;
  user_role: string;
  user_session_id: any;

  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router, private product_service: ProductService) { }

  ngOnInit() {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required]
    })
    this.user_session_id = sessionStorage.getItem("user_session_id")
    this.getAllProduct();
  }

  get rf() { return this.addEditProductForm.controls; }

  searchProduct() {
    const value = this.form.controls.search.value.trim();
    if (!!value) {
      this.getSearchProduct(value);
    } else {
      this.getAllProduct();
    }
  }

  getSearchProduct(value: string) {
    this.customerService.getSearchProduct(value).subscribe(data => {
      this.all_product_data = data;
      // console.log("ALl Product", this.all_products);
    }, error => {
      console.log('My error', error);
    });
  }

  getAllProduct() {
    this.user_role = sessionStorage.getItem("role");
    const user_session_id = sessionStorage.getItem("user_session_id")

    if (this.user_role === 'admin') {
      this.product_service.getAdminallProduct().subscribe(data => {
        this.all_product_data = data;
      }, error => {
        console.log("My error", error);
      })
    }
    else if (this.user_role === 'seller') {
      this.product_service.getSellerallProduct(user_session_id).subscribe(data => {
        this.all_product_data = data;
      }, error => {
        console.log("My error", error);
      })
    }


  }
  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;

    this.product_dto = {
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
      sellerId: this.user_session_id,
      count: 0
    }
    this.product_service.addNewProduct(this.product_dto).subscribe(data => {
      // console.log(data);
      jQuery('#addEditProductModal').modal('toggle');
      this.getAllProduct();
    }, err => {
      alert("Some Error Occured");
    })
  }

  editProductPopup(id) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.product_service.singleProduct(id).subscribe(data => {
      this.single_product_data = data;
      this.edit_product_id = data._id;
      // console.log("single_product_data", this.single_product_data)
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        // uploadPhoto: '',
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status
      })
    })
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status,
      sellerId: this.single_product_data.sellerId,
      count: this.single_product_data.count
    }
    this.product_service.updateProduct(this.edit_product_id, this.product_dto).subscribe(data => {
      this.single_product_data = undefined;
      this.product_data = undefined;
      // console.log(data);
      jQuery('#addEditProductModal').modal('toggle');
      this.getAllProduct();
    }, err => {
      alert("Some Error Occured");
    })
  }
  updateStatus(product, status) {
    this.product_data = product;
    this.product_dto = {
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status,
      sellerId: product.sellerId,
      count: product.count
    }
    this.product_service.updateProduct(product._id, this.product_dto).subscribe(data => {
      this.getAllProduct();
    }, err => {
      alert("Some Error Occured");
    })
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      this.product_service.deleteProduct(id).subscribe(data => {
        console.log("deleted successfully", data);
        this.getAllProduct();
      }, err => {
        alert("Some Error Occured");
      })
    } else {
      alert("You pressed Cancel!");
    }

  }
}
