import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderServerResponse } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  getSingleShopping(order: string){
    return this.http.get(this.SERVER_URL+'/get-shopping-list.php?search='+order);
    
  }
  getShoppingDetails(order: string){
    return this.http.get(this.SERVER_URL+'/get-shopping-list-details.php?search='+order);
    
  }

  registerOder(user: any,order: any,cord: any,addr: any,build: any,info: any,deliver: any,delivery_id: any,resto_id: any,contact: any,hand_over:any,notes:any,rider: any){
    return this.http.get(this.SERVER_URL+'/register-order-supa.php?user_id='+user+'&order_id='+order+'&coordinates='+cord+'&address='+addr+'&building='+build+'&information='+info+'&delivery_fees='+deliver+'&delivery_id='+delivery_id+'&resto_id='+resto_id+'&contact='+contact+'&notes='+notes+'&hand_over='+hand_over+'&rider='+rider);
  }

  getUserShoppingList(user_id: string){
    return this.http.get(this.SERVER_URL+'/get-user-shopping-list.php?search='+user_id);
    
  }
  
  getAllShoppingList(){
    return this.http.get(this.SERVER_URL+'/get-all-shopping-lists.php');
  }
  
  getRiderShoppingList(rider: any){
    return this.http.get(this.SERVER_URL+'/get-rider-pending-shopping.php?search='+rider);
  }

  getMonthDaysOrderTotals(month: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-day-order-totals.php?search='+month);
  }
  getMonthAnyStatusOrders(search: any, month: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-status-months-order-totals.php?search='+search+'&month_stamp='+month);
  }

  getRestoAnyStatusOrders(status: any, resto: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-orders-status-resto.php?search='+status+'&resto_id='+resto);
  }

  getMonthAnyStatusOrdersResto(status: any, restoId: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-status-restaurant-orders.php?search='+status+'&restoId='+restoId);
  }

  getMonthAnyStatusOrdersRider(status: any, riderId: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-orders-status-rider.php?search='+status+'&rider_id='+riderId);
  }

  getPagedOrders(start: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-paged-orders.php?start='+start);
  }

  getRestodOrders(restoId: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-restaurant-orders.php?search='+restoId);
  }

  getPagedOrdersFiltered(start: any,orderNumber: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-paged-orders-filter.php?start='+start+'&search='+orderNumber);
  }

  getOrderDetails(order: string){
    return this.http.get(this.SERVER_URL+'/get-order-details.php?search='+order);
  }

  getOrderStatus(order: any){
    return this.http.get(this.SERVER_URL+'/get-specific-order.php?search='+order);
  }

  getAllOrders(): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-all-orders.php');
  }

  getOtherOrderCosts(order: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-other-costs.php?search='+order);
  }

  updateOrderStatus(order: any,status: any){
    return this.http.get(this.SERVER_URL+'/update-order-status.php?order_number='+order+'&status_update='+status);
  }

  updateAssignOrderToRider(order: any,rider: any){
    return this.http.get(this.SERVER_URL+'/update-assign-order-to-rider.php?order_number='+order+'&rider='+rider);
  }

  updateOtherCostStatus(order: any,status: any){
    return this.http.get(this.SERVER_URL+'/update-other-costs-status.php?id='+order+'&status='+status);
  }

  updateOrderFees(order: any,fees: any){
    return this.http.get(this.SERVER_URL+'/update-order-delivery-fees.php?order_number='+order+'&fees='+fees);
  }

  registerOrderReview(order: any, detail: any,newQuantity: any){
    return this.http.get(this.SERVER_URL+'/register-order-review.php?order='+order+'&detail='+detail+'&newQuantity='+newQuantity);
  }

  registerOrderDetail(order_id: any, avail_id: any,quantity: any, price: any){
    return this.http.get(this.SERVER_URL+'/register-order-details.php?order_id='+order_id+'&avail_id='+avail_id+'&quantity='+quantity+'&price='+price);
  }

  registerReviewDetails(item_id: any, order: any){
    return this.http.get(this.SERVER_URL+'/register-review.php?item_id='+item_id+'&order_id='+order);
  }

  registerOtherCharge(order: any, charge: any, amount: any){
    return this.http.get(this.SERVER_URL+'/register-other-charges.php?order_number='+order+'&charge_type='+charge+'&amount='+amount);
  }

  sendCurrentLocationToServer(order: any, lat: any, long: any){
    return this.http.get(this.SERVER_URL+'/register-current-location.php?orderId='+order+'&latitude='+lat+'&longtitude='+long);
  }

  pushOrderToResto(order: any,status: any){
    return this.http.get(this.SERVER_URL+'/push-order-to-restaurant.php?order_number='+order+'&status_update='+status);
  }

  getRiderOrders(rider: any): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.SERVER_URL+'/get-rider-orders.php?rider='+rider);
  }

  getUserPayments(user: any){
    return this.http.get(this.SERVER_URL+'/get-user-payments.php?user_id='+user);
  }

  getOrderPayments(order: any){
    return this.http.get(this.SERVER_URL+'/get-order-payments.php?order_id='+order);
  }

  uploadImageToFolder(uploadData: any) {
    return this.http.post(`${this.SERVER_URL}/upload-receipt.php`, uploadData);
  } 
  saveReciptToDb(order: any,receipt: any){
    return this.http.get(this.SERVER_URL+'/receipt-saving.php?order_number='+order+'&receipt_name='+receipt);
  }

  updateShoppingPrices(item_id: any,price: any){
    return this.http.get(this.SERVER_URL+'/update-shopping-prices.php?item_id='+item_id+'&newPrice='+price);
  }

  getPersonAssignOrder(order: any){
    return this.http.get(this.SERVER_URL+'/get-order-rider.php?order='+order);
  }

  registerPayment(user: any,order: any,amount: any,ref: any,purpose: any,mode: any){
    return this.http.get(this.SERVER_URL+'/register-payment.php?user_id='+user+'&order='+order+'&amount='+amount+'&ref='+ref+'&purpose='+purpose+'&mode='+mode);
  }

}
