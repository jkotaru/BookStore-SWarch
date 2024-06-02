import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProxyService } from '../../services/user-proxy.service';
import { IUserModelAngular } from '../../models/IUserModelAngular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private userService: UserProxyService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.userService.getUserProfile(userId).subscribe(user => {
          this.user = user;
        });}
      })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  logout(): void {
    this.userService.user.logInStatus = false;
    this.router.navigate(['/']);
  }

  updateUserDetails(): void {
    this.userService.updateUserInfo(this.user).subscribe(
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