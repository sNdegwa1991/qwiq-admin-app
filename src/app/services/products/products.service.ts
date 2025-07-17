import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private SERVER_URL = environment.SERVER_URL;
  constructor(private http: HttpClient) {

   }
   getAllProducts(): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL+'/get-all-menus.php');
    }

  // getRestpoProducts(restoId: any): Observable<ServerResponse>{
  //     return this.http.get<ServerResponse>(this.SERVER_URL+'/get-restaurant-products.php?search='+restoId);
  //     }

    getRestoProducts(resto: any):Observable<ServerResponse>{
      return this.http.get<ServerResponse>(this.SERVER_URL+'/get-restaurant-products.php?search='+resto);
    }

    generalProductsSearch(search: any): Observable<ServerResponse>{
      return this.http.get<ServerResponse>(this.SERVER_URL+'/general-search.php?search='+search);
      }
      
    getReviewProposal(order: any): Observable<ServerResponse>{
        return this.http.get<ServerResponse>(this.SERVER_URL+'/get-order-review-proposals.php?order='+order);
        } 
    
    generalProductsSearchWithinResto(search: any,resto_id: any): Observable<ServerResponse>{
        return this.http.get<ServerResponse>(this.SERVER_URL+'/general-search-within-resto.php?search='+search+'&resto_id='+resto_id);
        } 

   getSpecificProduct(menuid: any): Observable<ServerResponse>{
        return this.http.get<ServerResponse>(this.SERVER_URL+'/get-specific-menu.php?menuid='+menuid);
      }
   updatePrice(item_id: any, newPrice: any){
      return this.http.get(this.SERVER_URL+'/update-product-price.php?item_id='+item_id+'&newPrice='+newPrice)
   }      
}
