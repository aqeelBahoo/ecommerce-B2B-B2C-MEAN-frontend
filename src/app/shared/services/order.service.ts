import { Injectable } from '@angular/core';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // tslint:disable-next-line: variable-name
  public order_url = environment.server_url + '/orders/';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  allOrders(): Observable<any> {
    return this.apiService.get(this.order_url);
  }

  getOrderFilter(query: string): Observable<any> {
    return this.apiService.get(`${this.order_url}filterTime?filter=${query}`);
    //  return this.apiService.get(`${this.order_url}?date_gte=${lt}&date_lte=${gt}`);
  }
  getOrderById(id): Observable<any> {
    return this.apiService.get(`${this.order_url}${id}`);
    //  return this.apiService.get(`${this.order_url}?date_gte=${lt}&date_lte=${gt}`);
  }

  getBuyerOrders(id: number): Observable<any> {
    return this.apiService.get(`${this.order_url}filterByUser?userId=${id}`);
  }
  getSellerOrder(id): Observable<any> {
    return this.apiService.get(`${this.order_url}filterByUser?sellerId=${id}`);
  }
}
