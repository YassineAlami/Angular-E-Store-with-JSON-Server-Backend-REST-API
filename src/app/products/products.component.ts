import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.medel";
import {Observable} from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  //hadi tari9a dyal l Observable li tandiro fiha async wkda
  //products$! : Observable<Array<Product>>;
  public products : Array<Product> = []
  public keyword : string = "";
  public totalPages : number = 0;
  public pageSize : number = 3;
  public currentPage : number = 1;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
      this.productService.getProducts(1,10).subscribe({
      next :  (resp)=>{
        this.products=resp.body as Product[];
        let totalProducts : number = parseInt(resp.headers.get('x-total-count')!);
        this.totalPages = Math.floor(totalProducts / this.pageSize);
        console.log(this.totalPages);
        console.log(totalProducts);
      },
      error: err => {console.log(err)}
    })
    //hadi nit tari9a dl Observable
    //this.products$=this.productService.getProducts();
  }
  handleCheckProduct(product: Product) {

    this.productService.checkProduct(product).subscribe({
      next : updatedProduct =>{
        //product.checked=!product.checked;
        this.getProducts();
      }
    })
  }

  handleDelete(product: Product) {
    if (confirm("Are you sure you want to delete this item?"))
    this.productService.deleteProduct(product).subscribe({
      next : value =>
        {
          //had ashal.. ghi tan3awed laffichage wthenat lwe9t
          //this.getProducts()
          this.products=this.products.filter(p=>p.id!=product.id);
        },
      error : err => { console.log(err); }
    });
  }

  searchProduct() {
    this.productService.searchProducts(this.keyword).subscribe({
      next:value=>{
        this.products=value;
      }
    })
  }
}
