import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { EditMode } from '../../enums/edit-mode.enum';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { EditLoggedUserInfo } from '../../../auth/interfaces/editLoggedUserInfo.interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);
  public currentUser = computed(() => this.authService.currentUser());
  public editModeValues = EditMode;
  public editModeStatus = signal(EditMode.OFF);


  public editUserForm: FormGroup = this.fb.group({
    name: [`${this.currentUser()?.name}`, [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.validationService.nameRegex)], []],
    lastName: [`${this.currentUser()?.lastName}`, [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.validationService.nameRegex)], []],
    phone: [`${this.trimPhone(this.currentUser()!.phone)}`, [Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.validationService.phoneRegex)], []]
  });


  public isValidField(field: string) {
    return this.validationService.isValidField(this.editUserForm, field);
  }




  public errorMessages: any = {
    name: {
      minlength: 'No se admiten menos de 3 caracteres',
      maxlength: 'Haz excedido el límite de 50 caracteres',
      pattern: 'Ingresa un nombre válido'
    },
    lastName: {
      minlength: 'No se admiten menos de 3 caracteres',
      maxlength: 'Haz excedido el límite de 50 caracteres',
      pattern: 'Ingresa un apellido válido'
    },
    phone: {
      pattern: 'Ingresa un número de teléfono válido siguiendo el formato: 9XXXXXXXX',
      exist: 'El celular que ingresaste ya esta registrado.'
    }
  };



  // obtener el campo para mostrar el mensaje de error
  getFieldErrors(field: string): string | null {

    const control: AbstractControl = this.editUserForm.controls[field];

    if (!control) {
      return null;
    }

    const errors = control.errors || {};

    for (const key of Object.keys(errors)) {
      if (this.errorMessages[field] && this.errorMessages[field][key]) {
        return this.errorMessages[field][key];
      }
    }

    return null;
  }








  onEditMode() {
    this.editModeStatus.set(EditMode.ON);
  }


  offEditMode() {
    this.editModeStatus.set(EditMode.OFF);
  }




  getFiledErrors() {




  }




  saveChanges() {
    // form values
    const { name, lastName, phone } = this.editUserForm.value;
    //Validar y convertir los valores antes de enviarlos al backend;
    const editUserInfo = {
      name: (name && name.trim() !== '') ? name.trim() : null,
      lastName: (lastName && lastName.trim() !== '') ? lastName.trim() : null,
      phone: (phone && phone.trim() !== '') ? phone.trim() : null
    };
    this.authService.editLoggedUserInfo(editUserInfo)
      .subscribe({
        next: () => this.editModeStatus.set(EditMode.OFF),
      });

  }

  trimPhone(phone: string): string {
    const trimPhone = phone.slice(3);
    return trimPhone;
  }

}
