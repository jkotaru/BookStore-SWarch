import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserProxyService } from './services/user-proxy.service';
import { ProductProxyService } from './services/product-proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private userproxy: UserProxyService, private productproxy: ProductProxyService, private router: Router) {
  }

  genres: any = [];

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.loadCategories();
    //this.userId = "517f5dda-300f-4696-9ad6-7215f4f229af";
  }

  loadCategories(): void {
    this.productproxy.getCategories().subscribe({
      next: (data:any) => {
        this.genres = data;
      },
      error: (err:any) => {
        console.error('Failed to get categories', err);
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.userproxy.user.logInStatus;
  }

  get userId():string {
    return this.userproxy.user.userId;
  }

  onGenreChange(genre: string): void {
    this.router.navigate(['/products/category', genre]);
  }
}
