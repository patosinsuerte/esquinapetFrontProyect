import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static validationFormValues(control: AbstractControl): ValidationErrors | null {
        if (control.value == '') {
            return {
                error: 'El campo no debe ser nulo'
            };
        }
        return null;
    }

}