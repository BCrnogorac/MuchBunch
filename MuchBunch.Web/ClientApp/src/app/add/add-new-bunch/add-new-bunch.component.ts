import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-new-bunch',
  templateUrl: './add-new-bunch.component.html',
  styleUrls: ['./add-new-bunch.component.css'],
})
export class AddNewBunchComponent {
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [this.confirmValidator]],
    });
  }

  autoTips: Record<string, Record<string, string>> = {
    en: {
      required: 'Input is required',
    },
    default: {
      email: 'The input is not valid email',
    },
  };

  submitForm(): void {
    let formModel = this.formGroup.getRawValue();

    if (this.formGroup.valid) {
      console.log(formModel);
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.formGroup.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.formGroup.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
