import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  public login_url = environment.server_url;
  public reg_url = environment.server_url;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  authLogin(user_name, password): Observable<any> {
    return this.apiService.post(this.login_url + '/user/login', { email: user_name, password });
  }
  userRegister(user_dto): Observable<any> {
    return this.apiService.post(this.reg_url + '/user/signup', user_dto);
  }

  adminLogin(user_name, password): Observable<any> {
    return this.apiService.post(this.login_url + '/user/login', { email: user_name, password });
  }
}
