export interface OrderModelServer {
    id: number,
    detail_id: number,
    order_id: number,
    amount: number,
    delivery_fees: number,
    resto_name: any,
    resto_coordinates: any,
    coordinates: any,
    address: any,
    information: any,
    building: any,
    date_placed: any,
    date_served: any,
    stage_status: number,
    status: number,
    date: any,
    total_orders: any,
    charge_type: any,
    date_added: any,
    u_name:any,
    u_phone:any,
    time_frame: any,
    timelines: any
}

export interface OrderServerResponse {
    orders: OrderModelServer[];
    costs: OrderModelServer[];
  }
  