import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  signInFormValue: any = {};
  user_data;

  constructor(private router: Router, private logsign_service: LoginSignupService) { }

  ngOnInit() {
  }

  onSubmitSignIn() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInFormValue));
    this.logsign_service.adminLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data => {
      if (data._id && data.role === 'admin') {
        this.user_data = data;
        sessionStorage.setItem('user_session_id', this.user_data.id);
        sessionStorage.setItem('role', this.user_data.role);
        this.router.navigateByUrl('/admin-dashboard');
      } else {
        alert('Invalid credentials');
      }

    }, error => {
      console.log('My error', error.text);
      alert(error.text);
    });
  }
}
