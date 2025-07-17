export interface UserModelServer {
    user_id : any,
    full_name: any,
    email: any,
    password: any,
    phone : any,
    role : any,
    specialization : any,
    status : any,
    resto_name : any
}

export interface UserServerResponse {
    user: UserModelServer[];
  }
  