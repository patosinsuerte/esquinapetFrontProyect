import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { ServiceType } from '../interfaces/services.interface';
import { TmplAstDeferredBlockLoading } from '@angular/compiler';
import { AppointmentResponseDTO } from '../interfaces/appointmentResponseDTO.interface';
import { environments } from '../../../environments/environments';
import { AppointmentDTO } from '../interfaces/appointment.interface';

@Injectable({ providedIn: 'root' })
export class HttpAppointmentService {

    constructor(private http: HttpClient) { }

    private apiLink: string = "http://localhost:8083";




    //* Appointments

    //CREATE APPOINTMET WHEN USER IS LOGGED;
    public createAppointment(formValues: AppointmentDTO): Observable<AppointmentResponseDTO | null> {

        const token = sessionStorage.getItem('token');

        if (!token) {
            return of(null);
        }
        const url: string = `${this.apiLink}/auth/appointments`;

        const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);


        return this.http.post<AppointmentResponseDTO>(url, formValues, { headers: headers })
            .pipe(
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }


    // get all appointments by id logged;
    public getAllAppointmentsByLoggedUser(userId: number): Observable<AppointmentResponseDTO[]> {
        const url: string = `${environments.baseUrl}/appointments`;

        return this.http.get<AppointmentResponseDTO[]>(url)
            .pipe(
                catchError(err => throwError(() => console.log(err)))
            );
    }






    private _timesReserved = signal<string[]>([]);
    public timesReserved = computed(() => this._timesReserved());






    public allTimes: string[] = [
        '09:30',
        '10:15',
        '11:00',
        '11:45',
        '12:00',
        '12:30',
        '13:15',
        '15:00',
        '15:45',
        '16:30',
        '17:15'
    ];






    getTimesReservedByDate(date: string | undefined): Observable<boolean> {

        const url = `${environments.baseUrl}/times/reserved/by/date?date=${date}`;

        return this.http.get<string[]>(url)
            .pipe(
                tap(res => {
                    const modifiedRes = res.map(time => time.replace(/:00$/, ''));
                    this._timesReserved.set(modifiedRes);
                }),
                map(_ => true), // Retornar true si la solicitud es exitosa
                catchError((err) => {
                    console.error('Error al obtener los tiempos reservados:', err);
                    return of(false);
                })
            );

    }






}
