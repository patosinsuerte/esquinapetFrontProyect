import { Component } from '@angular/core';
import { TeamCard } from '../../interfaces/teamCard.interface';

@Component({
    selector: 'core-desktop-carousel',
    templateUrl: './desktop-carousel.component.html',
    styleUrl: './desktop-carousel.component.scss'
})
export class DesktopCarouselComponent {

    public cards: TeamCard[] = [
        {
            img: '/assets/images/image-victor.jpg',
            title: 'Victor Sanhueza',
            text: 'Medico veterinario'
        },
        {
            img: '/assets/images/image-victor.jpg',
            title: 'Fernanda Mora',
            text: 'Medico veterinario'
        },
        {
            img: '/assets/images/image-victor.jpg',
            title: 'Isabel Castillo',
            text: 'Medico veterinario'
        },
        {
            img: '/assets/images/image-victor.jpg',
            title: 'Pedro Ramirez',
            text: 'Medico veterinario'
        },
        {
            img: '/assets/images/image-victor.jpg',
            title: 'Raquel Osorio',
            text: 'Medico veterinario'
        },
        {
            img: '/assets/images/image-victor.jpg',
            title: 'Juan Perez',
            text: 'Medico veterinario'
        },

    ]


    // grupos de cartas
    public cardGroups = [
        { start: 0, end: 3 },
        { start: 3, end: 6 }
    ];


    public currentIndex: number = 0;
    public totalItems: number = 2; // Agregar el número total de elementos en tu slider
    nextCards(): void {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    }

    previewCards(): void {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    }
}
