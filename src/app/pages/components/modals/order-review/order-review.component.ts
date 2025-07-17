import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderServerResponse } from 'src/app/models/order.model';
import { ServerResponse } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnInit {
  orderNumber: any;
  cart: any[]= [];
  orderDetails: any;
  orderStatus: any;
  aprovalStatus: any;
  loc: any;
  building: any;
  info: any;
  deliveryFees: any;
  phoneNumber: any;
  username: any;
  coordinates: any;
  clat: any;
  clng: any;
  catLength: any;
  otherCosts: any;
  otherCostsTotal: any;
  destLat: any;
  destLng: any;
  prodLen: any;
  proposeLength: any;

  DerDistance: any;
  restaurantName: any;
  reastaurantCoords: any;
  genProducts: any;
  proposedItems: any;
  imageURL = environment.SERVER_URL+'/images/foods';
  
  role = JSON.parse(localStorage.getItem('user') || '{}')[0].role;

  constructor(private orderService: OrderService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private prodService: ProductsService) { }

  ngOnInit() {
    this.dataPopulation();
  }

  generalProduct(prod: any){
    this.prodService.generalProductsSearch(prod).subscribe((res: ServerResponse) =>{
      this.genProducts = res.products;
      console.log(this.genProducts)
      this.prodLen = this.genProducts.length;
    });
  }

  async saveProductReview(item_id: any,order: any,product: any){
    const alert = await this.alertController.create({
      header: 'Are you sure you want to suggest '+product+' for this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('cancel')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.orderService.registerReviewDetails(item_id,order).subscribe(res =>{
              this.dataPopulation();
             })
          },
        },
      ],
    });

    await alert.present();
   
  }
  async addProduct(item_id: any,order: any,price:any,product:any){
    const alert = await this.alertController.create({
      header: 'Are you sure you want to add '+product+' for this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('cancel')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
           this.orderService.registerOrderDetail(order,item_id,1,price).subscribe(res =>{
            this.dataPopulation();
           })
          },
        },
      ],
    });

    await alert.present();
     
   }
  searchProducts(query: any){
    const search = query.target.value;
    if(search.length > 2){
    this.generalProduct(search);
    }
  }

  addAnotherCharge(){
    const chargeField = document.getElementById('add-other-cahrges') as HTMLInputElement;
    chargeField.style.display = "block";
  }
  saveNewCharge(){
    const chargeTxt = document.getElementById('charge_type') as HTMLInputElement;
    const amountTxt = document.getElementById('amount_charged') as HTMLInputElement;
    const newChargeholder = document.getElementById('add-other-cahrges') as HTMLInputElement;
    if(chargeTxt.value === '' || amountTxt.value === ''){
      newChargeholder.style.border="thin solid #e40956"
    } else {
      newChargeholder.style.border="thin solid #49be25";
     this.orderService.registerOtherCharge(this.orderNumber,chargeTxt.value,amountTxt.value).subscribe(res =>{
      this.dataPopulation()
     })

    }

  }

  async reviewOtherCharge(id: any, name: any){

    const alert = await this.alertController.create({
      header: 'Are you sure you want to remove '+name+' from this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('cancel')
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.orderService.updateOtherCostStatus(id,0).subscribe(res =>{
              this.dataPopulation()
            })
          },
        },
      ],
    });

    await alert.present();

  }

  async reviewOrder(id:any,name: any,quantity: any){
    let newQuantity = Number(quantity)-1;
    if(this.catLength === 1)
    {
      this.orderService.registerOrderReview(this.orderNumber,id,newQuantity).subscribe(res =>{
        this.dataPopulation();
      })
     this.orderService.updateOrderStatus(this.orderNumber,'3').subscribe(res =>{
     this.router.navigate(['tabs/orders-search/0'])
 
    
     })
    } else {
      this.orderService.registerOrderReview(this.orderNumber,id,newQuantity).subscribe(res =>{
        this.dataPopulation();
      })
   
    }
  }

  increaseQuantity(id:any,name: any,quantity: any){
    let newQuantity = Number(quantity)+1;

    this.orderService.registerOrderReview(this.orderNumber,id,newQuantity).subscribe(res =>{
      this.dataPopulation();
    })
    
  }

  openFeesEntry(){
    const feesField = document.getElementById('new-fees-holder') as HTMLInputElement;
    feesField.style.display = "block";
  }

  saveNewFees(){
    const feesTxt = document.getElementById('new-delivery') as HTMLInputElement;
    const newfeesholder = document.getElementById('new-fees-holder') as HTMLInputElement;
    if(feesTxt.value === ''){
      newfeesholder.style.border="thin solid #e40956"
    } else {
      newfeesholder.style.border="thin solid #49be25";
      this.orderService.updateOrderFees(this.orderNumber,feesTxt.value).subscribe(res =>{
        this.dataPopulation();
      })

    }
  }
  dataPopulation(){
    this.orderService.getOrderDetails(this.orderNumber).subscribe(res =>{
      this.orderDetails = res;
      this.cart = this.orderDetails.products;
      this.catLength = this.cart.length;
    });

    this.orderService.getOrderStatus(this.orderNumber).subscribe((data) =>{
      this.orderStatus = data;
      this.aprovalStatus = this.orderStatus.orders[0].status;
      this.deliveryFees = Number(this.orderStatus.orders[0].delivery_fees);
      this.phoneNumber = this.orderStatus.orders[0].u_phone;
      this.username = this.orderStatus.orders[0].u_name;
      this.info = this.orderStatus.orders[0].information;
      this.building = this.orderStatus.orders[0].building;
      this.loc = this.orderStatus.orders[0].address;
      this.restaurantName = this.orderStatus.orders[0].resto_name;
      this.coordinates = this.orderStatus.orders[0].coordinates;
      this.reastaurantCoords = this.orderStatus.orders[0].resto_coordinates;
   
     })

     this.orderService.getOtherOrderCosts(this.orderNumber).subscribe((res: OrderServerResponse) =>{
      this.otherCosts = res.costs;
      let len = this.otherCosts.length;
      let costs = 0;
      for(let i=0;i<len;i++){
       costs = costs+Number(this.otherCosts[i].amount);
      }
      this.otherCostsTotal = costs;
     })

     this.prodService.getReviewProposal(this.orderNumber).subscribe((res:ServerResponse) =>{
      this.proposedItems = res.products;
      this.proposeLength = this.proposedItems.length;
     })
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
