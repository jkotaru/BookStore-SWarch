import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProxyService } from '../../services/user-proxy.service';
import { IUserModelAngular } from '../../models/IUserModelAngular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: IUserModelAngular;
  editMode: boolean = false;
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, private userproxy: UserProxyService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.userproxy.getUserProfile(userId).subscribe(
          (user) => {
            console.log(user);
            this.user = user;
          },
          (error: HttpErrorResponse) => {
            if (error.status === 403) {
              console.error('Access Denied: ', error.message);
              this.router.navigate(['']);
            } else {
              console.error('Error fetching user profile: ', error.message);
            }
          }
        );
      }
      })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  logout(): void {
    this.userproxy.logoutUser().subscribe(
      (response: any) => {
        if(response.message === "user successfully logged out"){
          this.userproxy.user.userId = response.userId;
          this.userproxy.user.logInStatus = false;
          //console.log(this.userproxy.user.logInStatus);
          this.router.navigate(['']);
        }
        (error: any) => {
          // Handle error response
          console.error('Error while logging in:', error);
        }
      })
  }

  updateUserDetails(): void {
    this.userproxy.updateUserInfo(this.user).subscribe(
      (updatedUser: IUserModelAngular) => {
        console.log('User details updated successfully:', updatedUser);
        this.editMode = false;
      },
      (error:any) => {
        console.error('Error updating user details:', error);
      }
    );
  }
}