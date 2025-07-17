export interface ProductModelServer {
    id: number,
    restaurant: string,
    category: string ,
    menu: string,
    sub_menu: string,
    image: string,
    price: number,
    cat_id: number,
    cat_name: string,
    cat_image: string
}

export interface ServerResponse {
    products: ProductModelServer[];
  }
  