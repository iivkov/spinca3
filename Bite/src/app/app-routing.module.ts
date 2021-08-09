import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'new-dish',
    loadChildren: () => import('./pages/newDish/new-dish/new-dish.module').then( m => m.NewDishPageModule)
  },
  {
    path: '**', //VAŽAN JE REDOSLIJED RUTA, OVO NA KRAJ!
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }

  // //ILI
  // path = 'web',
  // children :[
  //   {
  //     path: 'dashboard',
  //     loadChildren: () => import('./pages/dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  //   },
  //   {
  //     path: 'menu',
  //     loadChildren: () => import('./pages/menu/menu/menu.module').then( m => m.MenuPageModule)
  //   },
  //   {
  //     path: 'new-dish',
  //     loadChildren: () => import('./pages/newDish/new-dish/new-dish.module').then( m => m.NewDishPageModule)
  //   }
  // ]

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
