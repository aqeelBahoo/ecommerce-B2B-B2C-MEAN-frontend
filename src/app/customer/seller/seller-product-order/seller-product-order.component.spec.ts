import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductOrderComponent } from './seller-product-order.component';

describe('SellerProductOrderComponent', () => {
  let component: SellerProductOrderComponent;
  let fixture: ComponentFixture<SellerProductOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProductOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
