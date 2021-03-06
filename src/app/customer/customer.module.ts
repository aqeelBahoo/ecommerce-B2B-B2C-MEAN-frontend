import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerDashboardComponent } from './buyer/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './buyer/checkout/checkout.component';
import { SellerProductOrderComponent } from './seller/seller-product-order/seller-product-order.component';

@NgModule({
  declarations: [BuyerDashboardComponent, SellerDashboardComponent, SigninSignupComponent, CheckoutComponent, SellerProductOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CustomerModule { }
