import { Component } from '@angular/core';
import { CardService } from '../../interfaces/cardService.interface';

@Component({
    selector: 'core-card-services',
    templateUrl: './card-services.component.html',
    styleUrl: './card-services.component.scss'
})
export class CardServicesComponent {
    // card creacition
    public cardContent: CardService[] = [
        {
            title: 'Consultas Médicas',
            img: './assets/images/consultamedica.jpg',
            subtitle: '',
            text: 'Examen Clínico,Medicina Interna General,Cirugia General y Especialidades'
        },

        {
            title: 'Cirugías',
            img: './assets/images/cirugia.jpg',
            subtitle: '',
            text: 'General y especialidades.'
        },

        {
            title: 'Toma de Muestras',
            img: './assets/images/muestras.jpg',
            subtitle: '',
            text: 'Muestra de Sangre y Orina de Laboratorio'
        },

        {
            title: 'Medicina Felina',
            img: './assets/images/gato.jpg',
            subtitle: '',
            text: 'Nefrología e Urología.'
        },

        {
            title: 'Identificacíon Chip',
            img: './assets/images/chip.jpg',
            subtitle: '',
            text: 'Implantación microchip Original "Virbac BackHome".'
        },

        {
            title: 'Peluqueria Canina y Felina',
            img: './assets/images/unas.jpg',
            subtitle: '',
            text: 'Baños Higiénicos, Medicados y Sanitarios Cortes de uñas y Limpiezas de oídos'
        },

    ]
}
