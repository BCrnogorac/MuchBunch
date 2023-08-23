import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductBM } from 'src/app/models/BM/productBM.model';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  public productTypes: ProductTypeBM[];
  public products: ProductBM[];

  private typesSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTypes();
  }

  getTypes() {
    this.typesSubscription = this.route.data.subscribe((data) => {
      this.productTypes = data.types;
    });
  }

  onSelectedPanel(productTypeId: number) {
    this.productService
      .getProductsByType(productTypeId)
      .subscribe((response) => {
        this.products = response;
      });
  }

  ngOnDestroy() {
    if (this.typesSubscription) {
      this.typesSubscription.unsubscribe();
    }
  }
}
