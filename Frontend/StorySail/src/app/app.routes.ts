import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'search', component: SearchComponent},
    { path: 'products/:productId', component: ProductDetailComponent },
    { path: 'profile/:userId', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products/category/:genre', component: ProductCategoryComponent},
    { path: 'admin', component: AdminComponent}
];
