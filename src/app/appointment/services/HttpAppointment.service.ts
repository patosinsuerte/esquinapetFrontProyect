import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Appointment } from '../interfaces/appointment.interface';
import { ServiceType } from '../interfaces/services.interface';

@Injectable({ providedIn: 'root' })
export class HttpAppointmentService {

    constructor(private http: HttpClient) { }

    private apiLink: string = "http://localhost:8083"

    // get all appointments
    public getAllAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiLink}/appointments`)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log({
                        status: error.status,
                        message: error.message
                    })
                    return of([])
                })
            );
    }






















    //get all services
    public getAllServices(): Observable<ServiceType[]> {
        return this.http.get<ServiceType[]>(`${this.apiLink}/services`)
    }



    // create appointment
    createAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.apiLink}/appointments/create`, appointment);
    }


}
