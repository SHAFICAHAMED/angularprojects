import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
    products:Product[]=[];
    filteredProducts: Product[] = [];

    newProduct= {id:0,name:"",price:0,description:""};
    editingProduct:Product | null=null;


    searchTerm: string = '';
    minPrice: number | null = null;
    maxPrice: number | null = null;



    constructor(private productService:ProductService){

    }

    ngOnInit(): void {
            this.loadProducts();
            this.filteredProducts = [...this.products];
    }
    loadProducts(){
        this.products = this.productService.getAllProducts();
    }

    addProduct() {
    if (this.newProduct.name && this.newProduct.price) {
      this.productService.addProduct({ ...this.newProduct });
      this.newProduct = { id: 0, name: '', price: 0, description: '' };
      this.loadProducts();
    }
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  updateProduct() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct);
      this.editingProduct = null;
      this.loadProducts();
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPrice =
        (!this.minPrice || p.price >= this.minPrice) &&
        (!this.maxPrice || p.price <= this.maxPrice);
      return matchesSearch && matchesPrice;
    });
  }

    clearFilters() {
    this.searchTerm = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.applyFilters();
  }
}
