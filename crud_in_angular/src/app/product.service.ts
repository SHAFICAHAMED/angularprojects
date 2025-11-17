import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private storageKey="products";//local storage key                                       
                                                                                                                                        
  constructor() { }

  getAllProducts():Product[]{
    const data = localStorage.getItem(this.storageKey);
    return data?JSON.parse(data):[];
  }

  //local storage la product ah store pandra function
  saveProducts(product:Product[]){
    localStorage.setItem(this.storageKey,JSON.stringify(product));

  }

  //add product
  addProduct(product:Product){
    const products = this.getAllProducts();
    product.id = products.length?products[products.length-1].id+1:1;
    products.push(product)
    this.saveProducts(products);
  }

  //update product
  updateProduct(updatePro:Product){
    const products = this.getAllProducts().map(p=> 
        p.id === updatePro.id?updatePro:p
    );
    this.saveProducts(products)
  }

  //delete product
  deleteProduct(id:number){
    const products = this.getAllProducts().filter(p=>p.id!==id);
    this.saveProducts(products)
  }

}
