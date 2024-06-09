import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, single, switchMap, take, tap, throwError } from 'rxjs';
import { UserResponseDTO } from '../interfaces/userResponseDTO.interface';
import { AuthStatus } from '../interfaces/authStatus.enum';
import { LoginResponseDTO } from '../interfaces/loginResponseDTO.interface';
import { UserProfileDTO } from '../interfaces/userProfileDTO.interface';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SaveUserDTO } from '../interfaces/saveUserDTO.interface';
import { RegisteredUserResponse } from '../interfaces/registeredUserDTO.interface';
import { EditLoggedUserInfo } from '../interfaces/editLoggedUserInfo.interface';
import { AppointmentDTO } from '../../appointment/interfaces/appointment.interface';
import { AppointmentResponseDTO } from '../../appointment/interfaces/appointmentResponseDTO.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private http: HttpClient = inject(HttpClient);

  private _currentUser = signal<UserResponseDTO | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private _activeAppointments = signal<AppointmentResponseDTO[]>([]);
  public activeAppointments = computed(() => this._activeAppointments());

  private _clickedAppointment = signal(null);




  constructor() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.loadSessionFromToken(token);
    }

  }



  public login(email: string, password: string): Observable<UserResponseDTO | null> {
    const url: string = `${environments.baseUrl}/auth/login`;

    const body = { email, password };

    return this.http.post<LoginResponseDTO>(url, body)
      .pipe(
        tap(({ user, jwt }) => {
          this._currentUser.set(user);
          sessionStorage.setItem('token', jwt);
          this._authStatus.set(AuthStatus.AUTHENTICATED);
        }),
        map((data) => data.user),
        catchError((err) => throwError(() => err))
      );
  }



  private loadSessionFromToken(token: string): void {
    // Realizar una solicitud al servidor para obtener la información del usuario
    // Puedes utilizar el token para autenticar esta solicitud
    const url = `${environments.baseUrl}/auth/profile`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<UserResponseDTO>(url, { headers }).subscribe(
      (response) => {
        this._currentUser.set(response);
        this._authStatus.set(AuthStatus.AUTHENTICATED);
      },
      catchError((err) => throwError(() => err))
    );
  }



  logout() {
    sessionStorage.removeItem('token');
    this._authStatus.set(AuthStatus.NOTAUTHENTICATED);
    this._currentUser.set(null);
  }

  register(newUser: SaveUserDTO): Observable<RegisteredUserResponse | null> {
    const url = `${environments.baseUrl}/users/register/user`;

    const body: SaveUserDTO = newUser;

    return this.http.post<RegisteredUserResponse>(url, body)
      .pipe(
        tap(user => {
          sessionStorage.setItem('token', user.jwt);
          const userRegistered: UserResponseDTO = {
            appointments: user.appointments,
            email: user.email,
            id: user.id,
            isActive: user.isActive,
            lastName: user.lastName,
            name: user.name,
            phone: user.phone,
            role: user.role,
            rut: user.rut
          };
          this._currentUser.set(userRegistered);
          this._authStatus.set(AuthStatus.AUTHENTICATED);
        }),
        map((data) => data),
        catchError((err) => throwError(() => err))
      );
  }


  // get profile
  getUserProfile(): Observable<UserProfileDTO | null> {

    const token = sessionStorage.getItem('token');
    const url = `${environments.baseUrl}/auth/profile`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (!token) {
      return of(null);
    }

    return this.http.get<UserProfileDTO | null>(url, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  getFormValues(field: string, form: FormGroup): string {
    return form.controls[field].value;
  }


  editLoggedUserInfo(editUserInfo: EditLoggedUserInfo): Observable<UserResponseDTO | null> {

    const url = `${environments.baseUrl}/auth/edit`;
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error("Token is not present in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // El cuerpo de la solicitud debería ser `editUserInfo`
    return this.http.patch<UserResponseDTO>(url, editUserInfo, { headers })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }


  getAllActiveAppointmets(): Observable<AppointmentResponseDTO[]> {

    const url = `${environments.baseUrl}/auth/appointments/actives`;
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error("Token is not present in localStorage");
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<AppointmentResponseDTO[]>(url, { headers })
      .pipe(
        tap((data) => {
          this._activeAppointments.set(data);
        }
        ),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }


  //cancel appointments

  cancelAppointments(appointmentId: number): Observable<boolean> {

    if (!sessionStorage.getItem('token')) {
      throw new Error('No se encontro el token');
    }

    const url = `${environments.baseUrl}/auth/appointments/${appointmentId}/cancel`;

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(url, null, { headers }).pipe(
      switchMap(() => {
        // Después de cancelar la cita, llamamos a getAllActiveAppointmets() para obtener los nuevos datos
        return this.getAllActiveAppointmets().pipe(
          map(() => true), // Devolvemos true para indicar que la cancelación fue exitosa
          catchError(err => {
            console.error('Error al cancelar la cita:', err);
            return of(false);
          })
        );
      })
    );
  }






  logoutForTokenExpiration(): void {

    const token = sessionStorage.getItem('token');

    if (!token) {
      return;
    }

    setTimeout(() => {
      this.logout();
    }, environments.jwt_expiration);

  }


















}





