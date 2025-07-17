import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ServerResponse } from 'src/app/models/product.model';
import { RestoServerResponse } from 'src/app/models/restaurant.model';
import { ProductComponent } from 'src/app/pages/components/modals/product/product.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { RestaurantService } from 'src/app/services/resto/restaurant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resto-products',
  templateUrl: './resto-products.page.html',
  styleUrls: ['./resto-products.page.scss'],
})
export class RestoProductsPage implements OnInit {
  products: any;
  totalProducts: any;
  restaurant: any;
  restoName: any;
  imageURL = environment.SERVER_URL+'/images/foods';
  restoId = JSON.parse(localStorage.getItem('user') || '{}')[0].specs;

  constructor(private productService: ProductsService,private modalCtrl: ModalController,private restoService: RestaurantService) {
    this.restoService.getRestaurant(this.restoId).subscribe((res: RestoServerResponse) =>{
      this.restaurant = res;
      this.restoName = this.restaurant.restaurants[0].name;
    })
   }

  ngOnInit() {
    this.getRestoProducts()
    setInterval(() => {
      this.getRestoProducts()
    }, 90000);
  }

  async getRestoProducts(){
    this.productService.getRestoProducts(this.restoId).subscribe((res: ServerResponse) =>{
     this.products = res.products;
     this.totalProducts = this.products.length;
    })
   }

   searchProduct(search: any){
    this.filterProduct(search.target.value,this.restoId);
}

filterProduct(search: any,resto_id: any){
  this.productService.generalProductsSearchWithinResto(search,resto_id).subscribe((res: ServerResponse) =>{
  this.products = res.products;
    this.totalProducts = this.products.length;
 })
}

async openModal(menuId: any) {
  const modal = await this.modalCtrl.create({
    component: ProductComponent,
    componentProps: { 
      menu_id: menuId,
    }
  });
  modal.present();
}

 
}
