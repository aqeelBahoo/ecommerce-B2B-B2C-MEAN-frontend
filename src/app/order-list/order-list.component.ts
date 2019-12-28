import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { Product } from '../core/models/object-model';
import * as Moment from 'Moment';
declare var jQuery: any;


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  all_product_data;
  addEditProductForm: FormGroup;
  addEditProduct: boolean = false;//for form validation
  popup_header: string;
  add_product: boolean;
  edit_product: boolean;
  grandTotal = 0;

  product_data;
  user_role;
  product_dto: Product;

  single_product_data;
  edit_product_id;
  cartList: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private orderService: OrderService) { }


  ngOnInit() {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required]
    })
    this.user_role = sessionStorage.getItem("role");
    const user_session_id = sessionStorage.getItem("user_session_id")

    if (this.user_role === 'admin') {
      this.getAllProduct();
    }
    else if (this.user_role === 'buyer') {
      this.getBuyerOrders(user_session_id);
    }
    else if (this.user_role === 'seller') {
      this.getSellerOrder(user_session_id);
    }
  }
  print() {
    window.print();
  }

  getOrders(value: string) {
    this.grandTotal = 0;
    if (value == 'all') {
      this.getAllProduct();
    }
    else if (value === 'today') {
      this.getToday()
    }
    else if (value === 'week') {
      this.getWeek()
    }
    else if (value === 'month') {
      this.getMonth()
    }
  }

  getToday() {
    console.log('----Today', Moment().format('MM/DD/YYYY'));
    let todayDateTime: any = Moment().format('MM/DD/YYYY');
    todayDateTime = new Date(todayDateTime).getTime()
    this.orderService.getOrderFilter('today')
      .subscribe((data) => {
        if (!!data) {
          this.all_product_data = data;
          this.calculateGrandTotal()
        }
      });
  }
  getWeek() {
    console.log('----Today', Moment().format('MM/DD/YYYY'));
    let sevenDaysBeforeTime: any = Moment().subtract(7, 'days').format('MM/DD/YYYY');
    console.log('----last Week', sevenDaysBeforeTime);
    sevenDaysBeforeTime = new Date(sevenDaysBeforeTime).getTime();
    //  console.log('------Last Week ', sevenDaysBefore.format('MM/DD/YYYY'));
    // console.log('----======', new Date(sevenDaysBefore.format('MM/DD/YYYY')).toLocaleDateString());
    this.orderService.getOrderFilter('week')
      .subscribe((data) => {
        this.all_product_data = data;
        this.calculateGrandTotal()

      });
  }
  getMonth() {
    console.log('----Today', Moment().format('MM/DD/YYYY'));
    let sevenDaysBeforeTime: any = Moment().subtract(1, 'month').format('MM/DD/YYYY');
    console.log('----last Month', sevenDaysBeforeTime);
    sevenDaysBeforeTime = new Date(sevenDaysBeforeTime).getTime();
    //  console.log('------Last Week ', sevenDaysBefore.format('MM/DD/YYYY'));
    // console.log('----======', new Date(sevenDaysBefore.format('MM/DD/YYYY')).toLocaleDateString());
    this.orderService.getOrderFilter('month')
      .subscribe((data) => {
        this.all_product_data = data;
        this.calculateGrandTotal()

      });
  }

  get rf() { return this.addEditProductForm.controls; }

  showOrder(id: number) {
    this.orderService.getOrderById(id).subscribe((data) => {
      if (!!data.products.length) {
        // this.all_product_data = data;
        // this.calculateGrandTotal();
        this.cartList = data.products;
      }
    });
  }

  calculateGrandTotal() {
    this.all_product_data.forEach(order => {
      this.grandTotal += order.totalAmount;
    });
  }

  getAllProduct() {
    this.orderService.allOrders().subscribe(data => {
      if (!!data.length) {
        this.all_product_data = data;
        this.calculateGrandTotal()
      }

    }, error => {
      console.log("My error", error);
    });
  }
  getBuyerOrders(id) {
    this.orderService.getBuyerOrders(id).subscribe(data => {
      if (!!data) {
        this.all_product_data = data;
        this.calculateGrandTotal();
      }
    }, error => {
      console.log("My error", error);
    });
  }
  getSellerOrder(id) {
    this.orderService.getSellerOrder(id).subscribe(data => {
      if (!!data) {
        this.all_product_data = data;
        this.calculateGrandTotal();
      }

    }, error => {
      console.log("My error", error);
    });
  }

}
