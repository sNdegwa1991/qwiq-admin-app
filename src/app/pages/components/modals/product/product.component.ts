import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServerResponse } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  menu_id: any;
  product:any;
  imageURL = environment.SERVER_URL+'/images/foods';

  constructor(private modalCtrl: ModalController,private productService: ProductsService) { }

  ngOnInit() { 
   this. populateProduct();
  }

  populateProduct(){
    this.productService.getSpecificProduct(`${this.menu_id}`).subscribe((res: ServerResponse) =>{
      this.product = res.products;
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  editPrice(){
    const priceField = document.getElementById('price-field') as HTMLInputElement;
    const priceSaveBtn = document.getElementById('price-save') as HTMLInputElement;
    const priceEditBtn = document.getElementById('price-edit') as HTMLInputElement;
    priceField.style.display = "block";
    priceSaveBtn.style.display = "block";
    priceEditBtn.style.display = "none";

  }

  saveNewPrice(){
    const priceField = document.getElementById('price-field') as HTMLInputElement;
    const newPrice = document.getElementById('new-price') as HTMLInputElement;
   // alert(newPrice.value)
     if(newPrice.value === ''){
      priceField.style.border="thin solid #e40956"
     } else {
      priceField.style.border="thin solid #49be25";

      this.productService.updatePrice(`${this.menu_id}`,newPrice.value).subscribe(res =>{
        this. populateProduct();
      })
     }
  }


}
