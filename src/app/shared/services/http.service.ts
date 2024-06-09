import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ValidationDTO } from '../../auth/interfaces/validation.interface';
import { SaveUserDTO } from '../../auth/interfaces/saveUserDTO.interface';




@Injectable({ providedIn: 'root' })
export class HttpService {


    private baseUrl: string = 'http://localhost:8083';

    constructor(private http: HttpClient) { }


    //* peticiones de validacion
    public validationOfUniqueField(field: string, fieldValue: string): Observable<ValidationDTO> {
        return this.http.get<ValidationDTO>(`${this.baseUrl}/validation/${field}?${field}=${fieldValue}`)
            .pipe(
                catchError(() => {
                    const errorResponse: ValidationDTO = {
                        exist: false,
                        message: 'Error en la validación del correo electrónico'
                    };
                    return of(errorResponse);
                })
            );
    }






}