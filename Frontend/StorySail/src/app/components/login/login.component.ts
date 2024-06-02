import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProxyService } from '../../services/user-proxy.service';
import { IUserModelAngular } from '../../models/IUserModelAngular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  errorResponse: string = '';

  constructor(private userproxy: UserProxyService, private router: Router) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // Call the backend API
      //console.log(formData.username);
      //console.log(formData.password);
      this.userproxy.userLogin(formData.username, formData.password)
        .subscribe(
          (response: any) => {
            // Handle successful login response
            if(response.message === "Login successful"){
              this.userproxy.user.userId = response.userId;
              this.userproxy.user.logInStatus = true;
              this.userproxy.user.role = response.role;
              //console.log(this.userproxy.user.logInStatus);
              this.router.navigate(['']);
            }
            //console.log(response);
            // Redirect user to dashboard or perform other actions
          },
          (error: any) => {
            // Handle error response
            if (error.status === 401) {
              this.errorResponse = "Incorrect Username/Password.";
          }else{
            console.error('Error while logging in:', error);
          }
          }
        );
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

}
