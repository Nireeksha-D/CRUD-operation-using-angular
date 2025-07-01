import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }

  //save data
  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/productList/",data)
  }

  //access data
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  //update data
  updateData(data : any, id:number){
    return this.http.put<any>("http://localhost:3000/productList/"+id,data)
  }

  //delete data
  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id)
  }
}
