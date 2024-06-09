import { Component } from '@angular/core';
import { ActivateLinkColorService } from '../../../shared/services/activateLinkColor.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { Observable, catchError, map, of } from 'rxjs';
import { ValidationService } from '../../../shared/services/validation.service';
import { SaveUserDTO } from '../../interfaces/saveUserDTO.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-register-page',
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {

    constructor(
        private fb: FormBuilder,
        private httpService: HttpService,
        private validationService: ValidationService,
        private authService: AuthService,
        private router: Router
    ) {

    }


    // f
    public registerForm: FormGroup = this.fb.group({
        rut: ['20.120.159-7', [Validators.required, Validators.pattern(this.validationService.rutRegex)], [this.validationService.rutHasExist]],
        name: ['Joaquin', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.validationService.nameRegex)]],
        lastName: ['Valencia', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.validationService.nameRegex)]],
        email: ['joaco@gmail.com', [Validators.required, Validators.pattern(this.validationService.emailRegex)], [this.validationService.emailHasExist], { updateOn: 'blur' }],
        phone: ['978451236', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.validationService.phoneRegex)], [this.validationService.phoneHasExist], { updateOn: 'blur' }],
        password: ['A12345678', [Validators.required, Validators.maxLength(100), Validators.pattern(this.validationService.passwordRegex)]],
        repeatedPassword: ['A12345678', [Validators.required, Validators.maxLength(100), Validators.pattern(this.validationService.passwordRegex)]]
    }, { validators: [this.validationService.isFieldOneEqualFieldTwo('password', 'repeatedPassword')] });



    public isValidField(field: string) {
        return this.validationService.isValidField(this.registerForm, field);
    }

    public errorMessages: any = {
        rut: {
            required: 'Este campo es requerido',
            pattern: 'Ingresa un R.U.T válido por favor.',
            exist: 'El rut que ingresaste ya esta registrado.'
        },
        name: {
            required: 'Este campo es requerido',
            minlength: 'No se admiten menos de 3 caracteres',
            maxlength: 'Haz excedido el límite de 50 caracteres',
            pattern: 'Ingresa un nombre válido'
        },
        lastName: {
            required: 'Este campo es requerido',
            minlength: 'No se admiten menos de 3 caracteres',
            maxlength: 'Haz excedido el límite de 50 caracteres',
            pattern: 'Ingresa un apellido válido'
        },
        email: {
            required: 'Este campo es requerido',
            pattern: 'Ingresa un correo electrónico válido',
            exist: 'El correo que ingresaste ya esta registrado.'
        },
        phone: {
            required: 'Este campo es requerido',
            pattern: 'Ingresa un número de teléfono válido siguiendo el formato: 9XXXXXXXX',
            exist: 'El celular que ingresaste ya esta registrado.'
        },
        password: {
            required: 'Este campo es requerido',
            maxlength: 'Haz excedido el límite de 100 caracteres',
            pattern: 'La contraseña debe contener al menos una letra mayúscula y un número'
        },
        repeatedPassword: {
            required: 'Este campo es requerido',
            maxlength: 'Haz excedido el límite de 100 caracteres',
            pattern: 'La contraseña debe contener al menos una letra mayúscula y un número',
            notEqual: 'Las contraseñas no coinciden'
        }
    };



    // obtener el campo para mostrar el mensaje de error
    getFieldErrors(field: string): string | null {

        const control: AbstractControl = this.registerForm.controls[field];

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



    //* guardar
    public onSave(): void {

        if (this.registerForm.invalid) {
            return;
        }

        const formValues = this.registerForm.value;



        this.regiser(formValues);
        this.registerForm.reset();
        this.registerForm.markAllAsTouched();
    }





    regiser(newUser: SaveUserDTO) {
        this.authService.register(newUser)
            .subscribe(({
                next: (res) => {
                    this.router.navigateByUrl('/dashboard');
                },
                // error: (err) => console.log(err)
            }));
    }


}



