import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from "../../services/product"
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl('')
  });

  showProductList: boolean = false;

  constructor(private productService: ProductService) { }

  products: Product[] = []

  ngOnInit(): void {
  }

  createProduct() {
    
    const {name, description, price} = this.productForm.value;
    let newProduct = new Product ();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.price = price;

    this.productService.create(newProduct).subscribe(product => {
      this.products.push(product);
    })

    this.productForm.get("name")?.reset('');
    this.productForm.get("description")?.reset('');
    this.productForm.get("price")?.reset('');

    this.showProductList = false;
    alert("Novo produto criado!");
  }

  getAllProducts() {
    this.productService.all().subscribe(products => {
        this.products = products;
        this.showProductList = !this.showProductList;
        return this.products;
    });
  }
}
