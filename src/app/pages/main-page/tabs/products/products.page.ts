import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServerResponse } from 'src/app/models/product.model';
import { ProductComponent } from 'src/app/pages/components/modals/product/product.component';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: any;
  totalProducts: any;
  role: any;
  resto: any;
  constructor(private productService: ProductsService,private modalCtrl: ModalController) { 
    this.role = JSON.parse(localStorage.getItem('user') || '{}')[0].role;
    if(this.role === '2'){
     this.getRestoProducts();
    } else {
      this.getProducts();
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.getProducts()
    }, 120000);
  }
  async getProducts(){
   this.productService.getAllProducts().subscribe((res: ServerResponse) =>{
    this.products = res.products;
    this.totalProducts = this.products.length;
   })
  }

  async getRestoProducts(){
    this.productService.getRestoProducts(this.resto).subscribe((res: ServerResponse) =>{
      console.log(res)
     this.products = res.products;
     this.totalProducts = this.products.length;
    })
   }

searchProduct(typeNumber: any){
    this.filterProduct(typeNumber.target.value);
}

filterProduct(orderNumber: any){
  this.productService.generalProductsSearch(orderNumber).subscribe((res: ServerResponse) =>{
  this.products = res.products;
    this.totalProducts = this.products.length;
    console.log(this.products)
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
