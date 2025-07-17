export interface ParcelModelServer {
    parcel_id: number,
    customer: String,
    customer_phone: String,
    parcel_origin: String,
    parcel_destination: String,
    parcel_origin_cords: String,
    parcel_end_cords: String,
    parcel_nature: String,
    parcel_description: String,
    distance: String,
    delivery_fees: String,
    date_created: String,
    date_created_stamp: String,
    date_served: String,
    date_served_stamp: String,
    status: String,
    rider_id: String,
    time_frame: any,
    timelines: any
}

export interface ParcelServerResponse {
    parcel: ParcelModelServer[];
  }