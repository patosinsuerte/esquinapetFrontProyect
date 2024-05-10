import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivateLinkColorService {


    constructor(private router: Router) { }

    // MAIN PAGE

    public activeLink: number = 0;

    setHomeLink() {
        this.activeLink = 0;
    }

    setAboutLink() {

        this.activeLink = 2;
    }

    setServiceLink() {
        this.activeLink = 1;
    }

    setContactLink() {
        this.activeLink = 3;
    }


    setCurrentSection(): void {

        const sections = document.querySelectorAll('section');
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        const currentPath = window.location.pathname;

        if (currentPath !== "/") {
            this.activeLink = 0; // Si la ruta es diferente a '/', establece activeLink como 0
            return; // Sal de la función porque no necesitas seguir verificando las secciones
        }
        sections.forEach((section: HTMLElement, index: number) => {
            const sectionId = section.id;
            const sectionOffset = section.offsetTop;

            if (scrollTop >= sectionOffset && (!sections[index + 1] || scrollTop < sections[index + 1].offsetTop)) {
                switch (sectionId) {
                    case 'home':
                        this.activeLink = 0;
                        break;

                    case 'services':
                        this.activeLink = 1;
                        break;
                    case 'about':
                        this.activeLink = 2;
                        break;

                    case 'contact':
                        this.activeLink = 3;
                        break;
                    default:
                        this.activeLink = 0;
                        break;
                }
            }
        });
    }





    // LOGIN AND AUTH PAGE


    public appointment: number = 0;

    get getAppointmentValue(): number {
        return this.appointment;
    }

    public setColorLinkAppointment() {
        if (this.router.url.endsWith('/create')) {
            this.appointment = 0;
        }
    }






















}

