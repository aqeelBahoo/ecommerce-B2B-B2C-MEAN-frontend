import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-seller-product-order',
  templateUrl: './seller-product-order.component.html',
  styleUrls: ['./seller-product-order.component.scss']
})
export class SellerProductOrderComponent implements OnInit {

  all_product_data = [];
  grandTotal = 0;

  user_role;

  cartList: any;
  constructor(private router: Router, private orderService: OrderService, private product_service: ProductService) {
    this.getAllProduct();
  }


  ngOnInit() {
    this.user_role = sessionStorage.getItem("role");
    const user_session_id = sessionStorage.getItem("user_session_id")
  }

  print() {
    window.print();
  }

  calculateGrandTotal() {
    this.all_product_data.forEach(order => {
      this.grandTotal += order.totalAmount;
    });
  }

  getAllProduct() {
    const user_session_id = sessionStorage.getItem("user_session_id")

    this.product_service.getSellerallProduct(user_session_id).subscribe(data => {
      if (!data) return;
      this.all_product_data = data.filter((pro) => pro.count > 0);
      this.all_product_data.forEach((pro) => {
        pro.totalAmount = pro.count * pro.dp;
      });
      this.calculateGrandTotal();
    }, error => {
      console.log("My error", error);
    })
  }
}
