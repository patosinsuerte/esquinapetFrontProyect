import { Component, EventEmitter, Output } from '@angular/core';



@Component({
    selector: 'appointment-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {


    public currentDate: Date = new Date();

    public currentMonth: number = this.currentDate.getMonth() + 1;

    public currentYear: number = this.currentDate.getFullYear();

    public lastDayOfCurrentMonth: number = this.currentDate.getDate();

    public dynamicMonthTitle?: Date;

    public dateSelectedByUser?: string

    public selectedDay?: number;


    @Output()
    public emitSelectedDate = new EventEmitter<string>();

    constructor() {

        this.updateCalendar(this.currentMonth, this.currentYear);
    }


    public daysOfWeek: string[] = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo',
    ];


    public daysOfMonth: number[] = [];



    public getDaysOfMonth(month: number, year: number): void {
        // 1 -> aqui obtenemos la fecha del mes siguiente al que ingresamos
        // ej: si ingresamos 3,2024 obtendremos -> 4,2024 con el dia 1.
        const newDate: Date = new Date(year, month, 1);

        // 2 -> seteamos la fecha creada anteriormente con el ultimo dia del mes anterior
        // a 4,2024,1. Que seria nuestra fecha que recibimos como argumento
        // 3,2024,31 -> que es el ultimo dia
        newDate.setDate(newDate.getDate() - 1);

        // 3 -> aqui obtenemos ese valor que es 31 en el ejemplo expuesto
        const daysInMonth: number = newDate.getDate();

        // 4 -> simplemente iteramos para imprimir los numeros
        for (let i = 1; i <= daysInMonth; i++) {
            this.daysOfMonth.push(i);
        }
    }


    public setFirstDayPosition(month: number, year: number): void {

        //1 -Recordemos que al instanciar una fecha con un 1, automaticamente se dirige al del mes
        // anterior, por lo que hay que restar un mes

        const date = new Date(year, month - 1, 1);
        let firstDay = date.getDay();

        // Ajustar el primer día para cuando es domingo
        if (firstDay === 0) {
            firstDay = 7; // Establecer el primer día en 7 (Domingo)
        }
        this.lastDayOfCurrentMonth = firstDay;
    }



    updateCalendar(month: number, year: number) {
        this.daysOfMonth = [];
        this.getDaysOfMonth(month, year);
        this.setFirstDayPosition(month, year);
        this.dynamicMonthTitle = new Date(year, month - 1);
    }



    //cambiar de mes
    public nextMonth(): void {
        const maxAllowedMonth = 12; // No avanzar más allá de diciembre
        if (this.currentMonth === maxAllowedMonth && this.currentYear === this.currentDate.getFullYear()) {
            return; // No avanzar más allá de diciembre del año actual
        }

        this.currentMonth += 1;
        if (this.currentMonth > 12) {
            this.currentMonth = 1;
            this.currentYear += 1;
        }
        this.updateCalendar(this.currentMonth, this.currentYear);

    }


    public prevMonth(): void {
        const minAllowedMonth = this.currentDate.getMonth() + 1; // No retroceder antes del mes actual
        if (this.currentYear === this.currentDate.getFullYear() && this.currentMonth <= minAllowedMonth) {
            return; // No retroceder más allá del mes actual
        }
        this.currentMonth -= 1;
        if (this.currentMonth < 1) {
            this.currentMonth = 12;
            this.currentYear -= 1;
        }
        this.updateCalendar(this.currentMonth, this.currentYear);
    }


    // se setea la fecha seleccionada en la interfaz
    setDateSelectedByUser(month: number, day: number) {


        // Agregar cero al principio si el mes es menor que 10
        const formattedMonth = month < 10 ? `0${month}` : month.toString();

        // Agregar cero al principio si el día es menor que 10
        const formattedDay = day < 10 ? `0${day}` : day.toString();

        // Formatear la fecha en el formato yyyy-MM-dd
        const formatDate = `${this.currentYear}-${formattedDay}-${formattedMonth}`;

        // Asignar la fecha formateada a dateSelectedByUser
        this.dateSelectedByUser = formatDate;

        // console.log(this.dateSelectedByUser);
        this.onEmitSelectedDate();

    }



    public onEmitSelectedDate() {
        this.emitSelectedDate.emit(this.dateSelectedByUser);
    }


    public onSetBackgroundToDay(day: number): void {
        this.selectedDay = day;
    }



}
