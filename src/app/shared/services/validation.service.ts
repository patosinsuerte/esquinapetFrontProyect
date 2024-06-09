import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ValidationDTO } from '../../auth/interfaces/validation.interface';
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {


    public nameRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ]+$/;
    public rutRegex = /^\d{2}\.\d{3}\.\d{3}-[\dk]$/;
    public emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    public phoneRegex = /^[0-9]{9}$/;
    public passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).+$/;

    constructor(private httpService: HttpService) { }


    //is valid field

    // metodo para errores
    isValidField(form: FormGroup, field: string): boolean | null {
        return form.controls[field].errors
            && form.controls[field].touched;
    }


    // validar campos de la constrasena para registrarse
    public isFieldOneEqualFieldTwo(field1: string, field2: string) {

        return (formGroup: AbstractControl): ValidationErrors | null => {

            const field1Value = formGroup.get(field1)?.value;
            const field2Value = formGroup.get(field2)?.value;

            if (field1Value != field2Value) {
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return { notEqual: true };
            }

            formGroup.get(field2)?.setErrors(null);

            return null;
        };

    }

    //validaciones asincronas
    public emailHasExist = (control: FormControl): Observable<ValidationErrors | null> => {
        const emailValue = control.value.trim().toLowerCase();

        return this.httpService.validationOfUniqueField('email', emailValue)
            .pipe(
                map(res => {
                    if (!res.exist) {
                        console.log(null);
                        return null; // Devuelve null si res.exist es false
                    } else {
                        return { message: res.message, exist: res.exist };
                    }
                }),
                catchError((err) => throwError(() => err.error.message))
            );
    };

    public phoneHasExist = (control: FormControl): Observable<ValidationErrors | null> => {
        const phoneValue = control.value.trim().toLowerCase();

        return this.httpService.validationOfUniqueField('phone', phoneValue)
            .pipe(
                map(res => {
                    if (!res.exist) {
                        return null; // Devuelve null si res.exist es false
                    } else {
                        return { message: res.message, exist: res.exist };
                    }
                }),
                catchError((err) => throwError(() => err.error.message))
            );
    };

    public rutHasExist = (control: FormControl): Observable<ValidationErrors | null> => {
        const rutValue = control.value.trim().toLowerCase();

        return this.httpService.validationOfUniqueField('rut', rutValue)
            .pipe(
                map(res => {
                    if (!res.exist) {
                        return null; // Devuelve null si res.exist es false
                    } else {
                        return { message: res.message, exist: res.exist };
                    }
                }),
                catchError((err) => throwError(() => err.error.message))
            );
    };



    // validacion login
    public emailHasNotExist = (control: FormControl): Observable<ValidationErrors | null> => {
        const emailValue = control.value.trim().toLowerCase();

        return this.httpService.validationOfUniqueField('email', emailValue)
            .pipe(
                map(res => {
                    if (!res.exist) {
                        return { message: res.message, exist: res.exist };
                    } else {
                        return null;
                    }
                }),
                catchError((err) => throwError(() => err.error.message))
            );
    };




}


