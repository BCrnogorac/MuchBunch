import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProductTypeBM } from 'src/app/models/BM/productTypeBM.model';
import { ThemeDto } from 'src/app/models/DTO/themeDto.model';
import { EmailUpcomingThemeTemplate } from 'src/app/models/emailUpcomingThemeTemplate.model';
import { ProductService } from 'src/app/services/product.service';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-create-upcoming-theme',
  templateUrl: './create-upcoming-theme.component.html',
  styleUrls: ['./create-upcoming-theme.component.css'],
})
export class CreateUpcomingThemeComponent implements OnInit {
  public formGroup: FormGroup;

  public themes: ThemeDto[];
  public types: ProductTypeBM[];

  public selectedTheme: any;

  constructor(
    private themeService: ThemesService,
    private fb: FormBuilder,
    private productService: ProductService,
    private modalRef: NzModalRef,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getThemes();
    this.getTypes();

    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      themeId: [''],
      productsQuantity: [''],
      bgQuantity: [''],
      accessoriesQuantity: [''],
      booksQuantity: [''],
      miniaturesQuantity: [''],
      price: [''],
    });
  }

  getThemes() {
    this.themeService.getThemes().subscribe((response) => {
      this.themes = response;
      this.themes.splice(0, 1);
    });
  }

  getTypes() {
    this.productService.getTypes().subscribe((response) => {
      this.types = response;
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let formModel: EmailUpcomingThemeTemplate = this.formGroup.getRawValue();

      console.log(formModel);
      this.themeService.swtupThemeNotification(formModel).subscribe(() => {
        this.modalRef.triggerOk();
        this.modalRef.destroy();
        this.message.success(
          `MuchBunch Theme was successfully created. Emails sent.`
        );
      });
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
