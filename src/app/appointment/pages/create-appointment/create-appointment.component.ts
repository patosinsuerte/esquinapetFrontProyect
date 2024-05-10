import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../../interfaces/appointment.interface';
import { HttpAppointmentService } from '../../services/HttpAppointment.service';
import { ServiceType } from '../../interfaces/services.interface';












@Component({
    selector: 'appointment-create-appointment',
    templateUrl: './create-appointment.component.html',
    styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent implements OnInit {


    constructor(private http: HttpAppointmentService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        // this.getAllAppointments();
    }


    public timeSeleted: string = '';

    public dateSelected: string = '';


    public myForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        rut: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.minLength(3)]],
        serviceType: [null, [Validators.required]],
        date: ['', [Validators.required]],
        time: ['', [Validators.required]],
    });


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

        this.myForm.reset({
            name: '',
            lastName: '',
            rut: '',
            phone: '',
            email: '',
            date: '',
            time: ''
        });
        this.myForm.markAllAsTouched();
    }





    // peticiones HTTP GET
    public allAppointments: Appointment[] = [];

    public getAllAppointments(): void {
        this.http.getAllAppointments().subscribe(res => {
            this.allAppointments = res;
            console.log(this.allAppointments);
        });
    }












    createAppointment(): void {
        this.http.createAppointment(this.myForm.value).subscribe(res => {

        });
    }




    // traer las opciones registradas en base de datos
    // en un arreglo
    // recorrer el arreglo en el frontend

    public servicesType: ServiceType[] = [];


    convertToServiceType(id: number, value: string) {
        const serviceType: ServiceType = {
            id: id,
            serviceName: value
        }
        this.myForm.patchValue({
            serviceType: serviceType
        });
    }









}
