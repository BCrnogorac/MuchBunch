import { Component, OnInit } from '@angular/core';
import { BunchService } from '../services/bunch.service';
import { BunchDTO } from '../models/DTO/bunchDto.model';
import { ThemesService } from '../services/themes.service';
import { ThemeDto } from '../models/DTO/themeDto.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ViewBunchComponent } from '../modals/view-bunch/view-bunch.component';
import { ProductService } from '../services/product.service';
import { ProductTypeBM } from '../models/BM/productTypeBM.model';
import { ProductDTO } from '../models/DTO/productDto.model';
import { ProductSubtypeBM } from '../models/BM/productSubtypeBM.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  public bunches: BunchDTO[] = [];
  public themedBunches: BunchDTO[] = [];
  public themes: ThemeDto[] = [];
  public types: ProductTypeBM[] = [];
  public subtypes: ProductSubtypeBM[] = [];

  public selectedType: any;
  public selectedSubtype: any;

  public currentThemeName: string;

  constructor(
    private bunchService: BunchService,
    private themeService: ThemesService,
    private modalService: NzModalService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getThemes();
    this.getProductTypes();
  }

  getThemes() {
    this.themeService.getThemes().subscribe((response) => {
      this.themes = response;

      this.currentThemeName = this.themes.find((e) => e.isActive === true).name;
      this.themeService
        .getBunchesByThemeId(this.themes.find((e) => e.isActive === true).id)
        .subscribe((response) => {
          this.themedBunches = response.bunches;
        });

      this.getBunchesByThemeId();
    });
  }
  getBunchesByThemeId() {
    this.themeService
      .getBunchesByThemeId(this.themes.find((e) => e.isActive === false).id)
      .subscribe((response) => {
        this.bunches = response.bunches;
      });
  }

  getBunches() {
    this.bunchService.getBunches().subscribe((response) => {
      this.bunches = response;
    });
  }

  onViewBunch(bunch: BunchDTO) {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: '',
      nzCentered: true,
      nzContent: ViewBunchComponent,
      nzData: {
        isEditMode: true,
        bunch: bunch,
      },
      nzWidth: 1200,
      nzFooter: null,
    });
  }

  getProductTypes() {
    this.productService.getTypes().subscribe((response) => {
      this.types = response;
    });
  }

  onSelectedType(selectedType: number) {
    if (selectedType != null) {
      this.themeService
        .getBunchesByThemeId(this.themes.find((e) => e.isActive === false).id)
        .subscribe((response) => {
          this.bunches = response.bunches;

          this.productService
            .getSubtypesByParentId(selectedType)
            .subscribe((response) => {
              this.subtypes = response;
            });

          this.bunches = this.bunches.filter(
            (e) => e.products.find((a) => +a.type.id == selectedType) != null
          );
        });
    } else {
      this.themeService
        .getBunchesByThemeId(this.themes.find((e) => e.isActive === false).id)
        .subscribe((response) => {
          this.bunches = response.bunches;
        });
    }
  }

  onSelectedSubtype(selectedSubtype: ProductSubtypeBM) {
    if (selectedSubtype != null) {
      console.log(this.bunches);
      console.log(selectedSubtype);

      this.bunches = this.bunches.filter(
        (e) =>
          e.products.find(
            (a) => a.subTypes.find((b) => b.id === selectedSubtype.id) != null
          ) != null
      );

      console.log(
        (this.bunches = this.bunches.filter(
          (e) =>
            e.products.find(
              (a) => a.subTypes.find((b) => b.id === selectedSubtype.id) != null
            ) != null
        ))
      );
    } else {
      this.themeService
        .getBunchesByThemeId(this.themes.find((e) => e.isActive === false).id)
        .subscribe((response) => {
          this.bunches = response.bunches;
        });
    }
  }
}
