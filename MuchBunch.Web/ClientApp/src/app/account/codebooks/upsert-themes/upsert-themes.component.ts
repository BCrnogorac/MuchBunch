import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EditThemeBM } from 'src/app/models/BM/editThemeBM.model';
import { ThemeBM } from 'src/app/models/BM/themeBM.model';
import { ThemeDto } from 'src/app/models/DTO/themeDto.model';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-upsert-themes',
  templateUrl: './upsert-themes.component.html',
  styleUrls: ['./upsert-themes.component.css'],
})
export class UpsertThemesComponent {
  public formGroup: FormGroup;

  public themes: ThemeDto[];

  public selectedTheme: ThemeBM;

  public isEditMode: boolean = false;
  public currentTheme: EditThemeBM;

  public isActive: boolean;

  constructor(
    private themeService: ThemesService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getThemes();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      typeName: ['', Validators.required],
    });
  }

  getThemes() {
    this.themeService.getThemes().subscribe((response) => {
      this.themes = response;
    });
  }

  listOfControl: Array<{
    id: number;
    controlInstance: string;
    isActive: boolean;
  }> = [];

  addField(controlInstance?: string, isActive?: boolean): void {
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `${controlInstance}`,
      isActive: isActive,
    };

    let index = this.listOfControl.push(control);
    this.formGroup.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl('', Validators.required)
    );
    this.formGroup.addControl(
      this.listOfControl[index - 1].controlInstance + 'isActive',
      new FormControl(isActive, Validators.required)
    );
    this.isActive = isActive;
    this.goToBottom();
  }

  removeField(
    i: { id: number; controlInstance: string; isActive: boolean },
    e?: MouseEvent
  ): void {
    e?.preventDefault();

    if (this.listOfControl.length > 0) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.formGroup.removeControl(i.controlInstance);
    }
  }

  deleteButton(
    i: { id: number; controlInstance: string; isActive: boolean },
    e?: MouseEvent
  ) {
    e?.preventDefault();

    if (this.isEditMode == true) {
      this.callConfirmModal(
        'Warning.',
        `Are you sure you want to delete ${this.currentTheme.name}?`
      );
    } else {
      this.removeField(i);
    }
  }

  submitForm(controlId: number) {
    let themename: string = this.formGroup.get(
      `${this.listOfControl.find((e) => e.id === controlId).controlInstance}`
    ).value;

    if (this.isEditMode == false) {
      let theme: ThemeBM = new ThemeBM(themename, this.isActive);

      this.themeService.addNewTheme(theme).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.getThemes();
        this.message.success(`Theme ${themename} was successfully added.`);
      });
    } else {
      let editTheme: EditThemeBM = new EditThemeBM(
        this.currentTheme.id,
        themename,
        this.isActive
      );

      console.log(editTheme);

      this.themeService.editTheme(editTheme).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.getThemes();
        this.message.success(`Theme ${themename} was successfully edited.`);
        this.isEditMode = false;
        this.currentTheme = null;
      });
    }
  }

  editForm(theme: ThemeDto) {
    this.isEditMode = true;
    this.currentTheme = theme;
    this.themes.splice(
      this.themes.findIndex((e) => e.id === theme.id),
      1
    );
    this.addField(theme.name, theme.isActive);
    this.formGroup
      .get(
        `${
          this.listOfControl.find((e) => e.controlInstance === theme.name)
            .controlInstance
        }`
      )
      .setValue(`${theme.name}`);

    this.isActive = theme.isActive;
  }

  goToBottom() {
    const element = document.getElementById('scrollIntoView');
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  callConfirmModal(title: string, text: string) {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: title,
      nzCentered: true,
      nzModalType: 'confirm',
      nzContent: text,
      nzOnOk: () => {
        this.themeService.removeTheme(this.currentTheme.id).subscribe(() => {
          modal.destroy();
          this.message.success(
            `Theme ${this.currentTheme.name} was successfully removed.`
          );
          this.removeField(
            this.listOfControl.find(
              (e) => e.controlInstance === this.currentTheme.name
            )
          );
          this.isEditMode = false;
        });
      },
      nzOnCancel: () => {
        this.getThemes();
        this.removeField(
          this.listOfControl.find(
            (e) => e.controlInstance === this.currentTheme.name
          )
        );
      },
    });
  }
}
