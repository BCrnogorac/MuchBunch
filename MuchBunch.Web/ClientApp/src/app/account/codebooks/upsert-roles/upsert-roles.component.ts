import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { InsertRoleBM } from 'src/app/models/BM/insertRoleBM.model';
import { RoleDTO } from 'src/app/models/DTO/roleDto.model';
import { RolesService } from 'src/app/services/role.service';

@Component({
  selector: 'app-upsert-roles',
  templateUrl: './upsert-roles.component.html',
  styleUrls: ['./upsert-roles.component.css'],
})
export class UpsertRolesComponent {
  public formGroup: FormGroup;

  public roles: RoleDTO[];

  public isEditMode: boolean = false;
  public currentRole: RoleDTO;

  constructor(
    private roleService: RolesService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      typeName: ['', Validators.required],
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(controlInstance?: string): void {
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `${controlInstance}`,
    };

    let index = this.listOfControl.push(control);
    this.formGroup.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl('', Validators.required)
    );
    this.goToBottom();
  }

  removeField(
    i: { id: number; controlInstance: string },
    e?: MouseEvent
  ): void {
    e?.preventDefault();

    if (this.listOfControl.length > 0) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.formGroup.removeControl(i.controlInstance);
    }
  }

  deleteButton(i: { id: number; controlInstance: string }, e?: MouseEvent) {
    e?.preventDefault();

    if (this.isEditMode == true) {
      this.callConfirmModal(
        'Warning.',
        `Are you sure you want to delete ${this.currentRole.name}?`
      );
    } else {
      this.removeField(i);
    }
  }

  submitForm(controlId: number) {
    let rolename: string = this.formGroup.get(
      `${this.listOfControl.find((e) => e.id === controlId).controlInstance}`
    ).value;

    if (this.isEditMode == false) {
      let role: InsertRoleBM = new InsertRoleBM(rolename);

      this.roleService.addNewRole(role).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.getRoles();
        this.message.success(`Role ${rolename} was successfully added.`);
      });
    } else {
      let editRole: RoleDTO = new RoleDTO(this.currentRole.id, rolename);

      this.roleService.editRole(editRole).subscribe(() => {
        this.removeField(this.listOfControl.find((e) => e.id === controlId));
        this.getRoles();
        this.message.success(`Role ${rolename} was successfully edited.`);
        this.isEditMode = false;
        this.currentRole = null;
      });
    }
  }

  editForm(role: RoleDTO) {
    this.isEditMode = true;
    this.currentRole = role;
    this.roles.splice(
      this.roles.findIndex((e) => e.id === role.id),
      1
    );
    this.addField(role.name);
    this.formGroup
      .get(
        `${
          this.listOfControl.find((e) => e.controlInstance === role.name)
            .controlInstance
        }`
      )
      .setValue(`${role.name}`);
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
        this.roleService.removeRole(this.currentRole.id).subscribe(() => {
          modal.destroy();
          this.message.success(
            `Role ${this.currentRole.name} was successfully removed.`
          );
          this.removeField(
            this.listOfControl.find(
              (e) => e.controlInstance === this.currentRole.name
            )
          );
          this.isEditMode = false;
        });
      },
      nzOnCancel: () => {
        this.getRoles();
        this.removeField(
          this.listOfControl.find(
            (e) => e.controlInstance === this.currentRole.name
          )
        );
      },
    });
  }
}
