import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { RestaurantResolverService } from './services/resolvers/restaurant/restaurant-resolver.service';

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'menu',
  //   loadChildren: () => import('./pages/menu/menu/menu.module').then( m => m.MenuPageModule)
  // },
  // {
  //   path: 'new-dish',
  //   loadChildren: () => import('./pages/newDish/new-dish/new-dish.module').then( m => m.NewDishPageModule)
  // },
  // {
  //   path: '**', //VAŽAN JE REDOSLIJED RUTA, OVO NA KRAJ!
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // canActivate : [AuthGuard]

  //ILI
  {
    path: 'web',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/menu/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'new-dish',
        loadChildren: () => import('./pages/newDish/new-dish/new-dish.module').then(m => m.NewDishPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/orders/orders/orders.module').then( m => m.OrdersPageModule)
      },
    ],
    canActivate: [AuthGuard],
    resolve: {
      restaurant: RestaurantResolverService
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  
  {
    path: 'mobile',
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./pages/mobile/dahsboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      // },
      // {
      //   path: 'cart',
      //   loadChildren: () => import('./pages/mobile/cart/cart/cart.module').then( m => m.CartPageModule)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./pages/mobile/profile/profile/profile.module').then( m => m.ProfilePageModule)
      // },
      {
        path: 'tabs',
        loadChildren: () => import('./pages/mobile/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./pages/mobile/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
      },
    ],
    resolve: {
      restaurant: RestaurantResolverService
    },
    canActivate: [AuthGuard],
    
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }


  // {
  //   path: 'orders',
  //   loadChildren: () => import('./pages/orders/orders/orders.module').then( m => m.OrdersPageModule)
  // },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
