import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {

  order_dashboard_data;
  total_order = 0;

  product_dashboard_data;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private router: Router, private customerService: CustomerService, private product_service: ProductService) { }

  ngOnInit() {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }
  sellerProductDashboard() {
    this.router.navigateByUrl("/seller/product");
  }
  sellerOrderDashboard() {
    this.router.navigateByUrl("/seller/all-order");
  }
  sellerOrderDashboardData() {
    const user_session_id = sessionStorage.getItem("user_session_id");


    this.product_service.getSellerallProduct(user_session_id).subscribe(data => {
      if (!data) return;
      const soldProducts = data.filter((pro) => pro.count > 0);
      this.total_order = Number(soldProducts.length);
    }, error => {
      console.log("My error", error);
    })

    /*  this.customerService.getSellerOrder(user_session_id).subscribe(data => {
       if (!data.length) {
         return;
       }
       this.order_dashboard_data = data;
       this.total_order = Number(this.order_dashboard_data.length);
       this.last_order_date = this.order_dashboard_data[this.total_order - 1].date;
       // console.log("product_dashboard_data", this.order_dashboard_data);
     }, error => {
       console.log("My error", error);
     }) */
  }

  sellerProductDashboardData() {
    const user_session_id = sessionStorage.getItem("user_session_id")

    this.customerService.getSellerproductDashboardData(user_session_id).subscribe(data => {
      this.product_dashboard_data = data;
      for (status in this.product_dashboard_data) {
        // console.log(this.product_dashboard_data[status].status);
        if (this.product_dashboard_data[status].status == 'publish') {
          ++this.publish_product;
        } else if (this.product_dashboard_data[status].status == 'inactive') {
          ++this.inactive_product;
        } else if (this.product_dashboard_data[status].status == 'draft') {
          ++this.draft_product;
        }
        ++this.total_product;
      }
      // console.log(this.publish_product);

      // console.log("product_dashboard_data", this.product_dashboard_data[this.product_dashboard_data.length - 1]);
    }, error => {
      console.log("My error", error);
    })
  }
}
