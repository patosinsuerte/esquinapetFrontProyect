import { Component, OnInit, computed } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpAppointmentService } from '../../services/HttpAppointment.service';
import { ServiceType } from '../../interfaces/services.interface';
import { PetType } from '../../interfaces/petType.interface';
import { AppointmentDTO } from '../../interfaces/appointment.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ErrorFieldError } from '../../interfaces/errorFieldError.enum';
import { CustomValidators } from '../../services/customValidators';
import { ValidationService } from '../../../shared/services/validation.service';
import { catchError, tap } from 'rxjs';


@Component({
    selector: 'appointment-create-appointment',
    templateUrl: './create-appointment.component.html',
    styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent {


    constructor(
        private http: HttpAppointmentService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private validationService: ValidationService
    ) { }



    public currentUser = computed(() => this.authService.currentUser());

    public myForm: FormGroup = this.formBuilder.group({
        name: [`${this.currentUser()?.name}`, [Validators.required, Validators.minLength(3)]],
        lastName: [`${this.currentUser()?.lastName}`, [Validators.required, Validators.minLength(3)]],
        petName: ['', [Validators.required, Validators.minLength(3)]],
        rut: [`${this.currentUser()?.rut}`, [Validators.required, Validators.minLength(3)]],
        phone: [`${this.currentUser()?.phone.substring(3)}`, [Validators.required, Validators.minLength(3)]],
        email: [`${this.currentUser()?.email}`, [Validators.required, Validators.minLength(3)]],
        date: ['', [Validators.required]],
        time: ['', [Validators.required]],
        serviceTypeId: ['', [Validators.required]],
        petId: ['', [Validators.required]],
    });






    public isValidField(field: string) {
        return this.validationService.isValidField(this.myForm, field);
    }


    public errorMessages: any = {
        petName: {
            required: 'Este campo es requerido',
        },
        serviceTypeId: {
            required: 'Este campo es requerido'
        },
        petId: {
            required: 'Este campo es requerido'
        },
        time: {
            required: 'Este campo es requerido'
        },
        date: {
            required: 'Este campo es requerido'
        }
    };

    // obtener el campo para mostrar el mensaje de error
    getFieldErrors(field: string): string | null {

        const control: AbstractControl = this.myForm.controls[field];

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


    public servicesType: ServiceType[] = [
        { id: 1, serviceName: 'CORTE_DE_PELO' },
        { id: 2, serviceName: 'CORTE_DE_UÑAS' },
        { id: 3, serviceName: 'CONTROL' },
        { id: 4, serviceName: 'CIRUJIAS' },
    ];

    public petType: PetType[] = [
        { id: 1, petType: 'PERRO' },
        { id: 2, petType: 'GATO' },
    ];


    public timeSeleted: string = '';

    public dateSelected: string = '';




    public onReceiveDateFromChild(date: string) {
        this.dateSelected = date;
        this.myForm.patchValue({
            date: date
        });

    }


    public onReceiveTimeFromChild(time: string) {
        this.timeSeleted = time;
        this.myForm.patchValue({
            time: time
        });
    }


    public onSave() {
        this.createAppointment();
        this.myForm.markAllAsTouched();
    }

    createAppointment() {

        const formValues: AppointmentDTO = this.myForm.value;

        this.http.createAppointment(formValues).subscribe({
            next: (data) => {

                Swal.fire({
                    title: 'Exito',
                    icon: 'success',
                    text: 'Se creo correctamente la cita',
                    confirmButtonColor: '#d5b14e'
                });
                this.router.navigateByUrl('/dashboard');
            },
            error: (err) => {

                // err.error.forEach((field: any) => console.log(field.field));

                Swal.fire({
                    title: 'Error',
                    text: `Por favor verifica los campos`,
                    icon: 'error',
                    confirmButtonColor: '#d5b14e'
                });
            }
        });
    }


    // transformar telefono
    transformPhoneNumber(): string {
        const phone: string = this.myForm.controls['phone'].value;
        return phone.substring(4);
    }







    public timesToEmit: string[] = [];


    public onRecievevailibleTimes(times: string[]) {
        this.timesToEmit = times;
    }






}
