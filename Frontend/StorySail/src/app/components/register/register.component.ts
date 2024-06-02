import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProxyService } from '../../services/user-proxy.service';
import { IUserModelAngular } from '../../models/IUserModelAngular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;

  constructor(private userproxy: UserProxyService, private router: Router) { }

  formData: any = {};
  userData!: IUserModelAngular ;
  isExpanded: boolean = false;
  errorResponse: string = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this.userData = this.registerForm.value;
      console.log(this.userData);
      this.userproxy.userRegister(this.userData).subscribe(
          (response: any) => {
            if(response.message === "User data added to database!"){
              this.router.navigate(['/login']);
            }
          },
          (error: any) => {
            if (error.status === 400) {
                this.errorResponse = "Username already exists.";
            } else {
                console.error('Error while registering user:', error);
            }
        }
        );
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    //console.log(this.isExpanded)
  }

}
