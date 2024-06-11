import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivateLinkColorService } from '../../../shared/services/activateLinkColor.service';
import { ScrollService } from '../../../shared/services/scroll.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
    selector: 'auth-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {




    constructor(private scrollService: ScrollService, private activeLink: ActivateLinkColorService) {

    }

    ngOnInit(): void {

        this.scrollService.scrollToTop();
    }

    private formBuilder: FormBuilder = inject(FormBuilder);
    private authService: AuthService = inject(AuthService);
    private valitationService: ValidationService = inject(ValidationService);
    private router: Router = inject(Router);




    public loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email], [this.valitationService.emailHasNotExist], { updateOn: 'blur' }],
        password: ['', [Validators.required],]
    });


    isValidField(field: string) {
        return this.valitationService.isValidField(this.loginForm, field);
    }


    public errorMessages: any = {
        email: {
            required: 'Este campo es requerido',
            exist: 'El email no existe'
        },
        password: {
            required: 'Este campo es requerido',
        }

    };



    // obtener el campo para mostrar el mensaje de error
    getFieldErrors(field: string): string | null {

        const control: AbstractControl = this.loginForm.controls[field];

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


    public passwordNotMatch = false;
    // authentication methods
    public login() {
        const { email, password } = this.loginForm.value;

        this.authService.login(email, password)
            .subscribe({
                next: (res) => {
                    this.router.navigateByUrl('/dashboard');
                    this.checkExpirationToken();
                },
                error: (err) => {
                    if (err.error.field == 'password') {
                        this.passwordNotMatch = true;
                        console.log(err.error.field);
                    }
                }
            });
    }




    public checkExpirationToken() {
        this.authService.logoutForTokenExpiration();
    }


    public resetPasswordError() {
        this.passwordNotMatch = false;
    }


}
