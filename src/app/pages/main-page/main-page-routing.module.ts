import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPagePage } from './main-page.page';

const routes: Routes = [
  {
    path: '',
    component: MainPagePage,
    children: [
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./tabs/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./tabs/account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./tabs/order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./tabs/products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./tabs/search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'orders-search/:status',
        loadChildren: () => import('./orders/monthly-orders/monthly-orders.module').then( m => m.MonthlyOrdersPageModule)
      },
      {
        path: 'order-details/:orderId',
        loadChildren: () => import('./orders/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
      },
      {
        path: 'resto-home',
        loadChildren: () => import('./users-pages/resto-account/resto-account.module').then( m => m.RestoAccountPageModule)
      },
      {
        path: 'resto-orders',
        loadChildren: () => import('./users-pages/resto-account/resto-orders/resto-orders.module').then( m => m.RestoOrdersPageModule)
      },
      {
        path: 'resto-products',
        loadChildren: () => import('./users-pages/resto-account/resto-products/resto-products.module').then( m => m.RestoProductsPageModule)
      },
      {
        path: 'resto-account-set',
        loadChildren: () => import('./users-pages/resto-account/resto-account/resto-account.module').then( m => m.RestoAccountPageModule)
      }, 
      {
        path: 'resto-orders-details/:orderId',
        loadChildren: () => import('./users-pages/resto-account/resto-orders-details/resto-orders-details.module').then( m => m.RestoOrdersDetailsPageModule)
      },
     
      {
        path: 'order-search-status/:status',
        loadChildren: () => import('./users-pages/resto-account/resto-status-orders/resto-status-orders.module').then( m => m.RestoStatusOrdersPageModule)

      },
      {
        path: 'ridder-account',
        loadChildren: () => import('./users-pages/ridder-account/ridder-account.module').then( m => m.RidderAccountPageModule)
      },
      {
        path: 'satus-orders/:status',
        loadChildren: () => import('./users-pages/ridder-account/status-orders/status-orders.module').then(m => m.StatusOrdersPageModule)
      },
      {
        path: 'ridder-order-details/:orderId',
        loadChildren: () => import('./users-pages/ridder-account/orders-details/orders-details.module').then(m => m.OrdersDetailsPageModule)
      },
      {
        path: 'restos',
        loadChildren: () => import('./tabs/account/restos/restos.module').then(m => m.RestosPageModule)
      },
      {
        path: 'ridder',
        loadChildren: () => import('./tabs/account/ridder/ridder.module').then(m => m.RidderPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./tabs/account/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'resto-finance/:id',
        loadChildren: () => import('./tabs/account/restos/resto-finance/resto-finance.module').then(m => m.RestoFinancePageModule)
      },
      {
        path: 'rider-details/:id',
        loadChildren: () => import('./tabs/account/ridder/rider-details/rider-details.module').then(m => m.RiderDetailsPageModule)
      },
      {
        path: 'rider-savings/:id',
        loadChildren: () => import('./tabs/account/ridder/rider-savings/rider-savings.module').then(m => m.RiderSavingsPageModule)
      },
      {
        path: 'rider-savings',
        loadChildren: () => import('./users-pages/rider-account/rider-savings/rider-savings.module').then( m => m.RiderSavingsPageModule)
      },
      {
        path: 'parcel-details/:order',
        loadChildren: () => import('./tabs/parcel/parcel-details/parcel-details.module').then( m => m.ParcelDetailsPageModule)
      },
      {
        path: 'shopping-list',
        loadChildren: () => import('./tabs/supermarket/shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule)
      },
      {
        path: 'shopping-pricing/:order',
        loadChildren: () => import('./tabs/supermarket/shopping-pricing/shopping-pricing.module').then( m => m.ShoppingPricingPageModule)
      },
      {
        path: 'acknowledge-payment/:order/:user',
        loadChildren: () => import('./orders/acknowledge-payment/acknowledge-payment.module').then( m => m.AcknowledgePaymentPageModule)
      },
      {
        path: 'chat-panel/:user/:name',
        loadChildren: () => import('./tabs/chat-panel/chat-panel.module').then( m => m.ChatPanelPageModule)
      },


    ]
  },
  {
    path: 'shopping-confirmation/:order',
    loadChildren: () => import('./tabs/supermarket/shopping-confirmation/shopping-confirmation.module').then( m => m.ShoppingConfirmationPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./tabs/supermarket/rider/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'pricing/:order',
    loadChildren: () => import('./tabs/supermarket/rider/pricing/pricing.module').then( m => m.PricingPageModule)
  },
  {
    path: 'confirmation/:order',
    loadChildren: () => import('./tabs/supermarket/rider/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  }
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPagePageRoutingModule {}
