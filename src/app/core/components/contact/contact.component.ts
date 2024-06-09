import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';



@Component({
    selector: 'core-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {



    public currentlngLat: LngLat = new LngLat(-71.54051220070589, -33.03965056664552);

    public map?: Map;
    public marker?: Marker;

    @ViewChild('map')
    public mapRef?: ElementRef;

    ngAfterViewInit(): void {

        if (!this.mapRef) {
            throw 'Elemento map no encontrado en el HTML';
        }

        console.log(this.mapRef);
        this.map = new Map({
            container: this.mapRef.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: this.currentlngLat, // starting position [lng, lat]
            zoom: 15, // starting zoom
        });


        this.marker = new Marker()
            .setLngLat(this.currentlngLat)
            .addTo(this.map);
        ;
        this.marker.setDraggable(false);

        this.marker.on('dragend', () => {
            this.currentlngLat = this.marker!.getLngLat();
            console.log(this.currentlngLat);
        });
        // this.mapListener();
    }


    ngOnDestroy(): void {
        this.map?.remove();
    }

    mapListener() {
        if (!this.map) {
            throw 'Map no encontrado en el HTML';
        }

        this.map.on('move', () => {
            this.currentlngLat = this.map!.getCenter();
        });
    }






}
