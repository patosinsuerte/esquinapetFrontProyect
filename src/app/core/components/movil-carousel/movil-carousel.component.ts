import { Component } from '@angular/core';
import { TeamCard } from '../../interfaces/teamCard.interface';

@Component({
    selector: 'core-movil-carousel',
    templateUrl: './movil-carousel.component.html',
    styleUrl: './movil-carousel.component.scss'
})
export class MovilCarouselComponent {
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

    public cardGroups = [{ start: 0, end: this.cards.length - 1 }];
    public currentIndex: number = 0;
    public totalItems: number = this.cards.length;

    nextCards(): void {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    }

    previewCards(): void {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    }
}
