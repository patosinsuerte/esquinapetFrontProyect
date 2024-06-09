import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicesType'
})
export class ServicesTypePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; // Manejar valores nulos o indefinidos

    // Dividir la cadena en palabras
    const words = value.split('_');

    // Capitalizar cada palabra y unirlas con un espacio
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

}
