import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterBM } from '../models/BM/registerBM.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
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
    let formModel: RegisterBM = this.formGroup.getRawValue();
    formModel.role = 'company';

    if (this.formGroup.valid) {
      this.authService.register(formModel).subscribe((token) => {
        this.authService.storeTokenToLocalStorage(token.token);
        this.router.navigate(['/home']);
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
