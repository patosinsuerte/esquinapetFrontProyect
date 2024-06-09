import { Component, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserResponseDTO } from '../../../auth/interfaces/userResponseDTO.interface';
import { AppointmentDTO } from '../../../appointment/interfaces/appointment.interface';
import { AppointmentResponseDTO } from '../../../appointment/interfaces/appointmentResponseDTO.interface';
import { pipe, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-appointmets',
  templateUrl: './my-appointmets.component.html',
  styleUrl: './my-appointmets.component.scss'
})
export class MyAppointmetsComponent implements OnInit {



  ngOnInit(): void {
    this.getAllActiveAppointmentsByLoggedUser();
  }



  private authService: AuthService = inject(AuthService);

  public currentUser = computed(() => this.authService.currentUser());


  public appointments = computed(() => this.authService.activeAppointments());

  public gettAllAppointmentsByLoggedUserErrorMessage = '';

  getAllActiveAppointmentsByLoggedUser() {
    this.authService.getAllActiveAppointmets()
      .subscribe({
        next: (appointments) => console.log(appointments),
        error: (err) => {
          this.gettAllAppointmentsByLoggedUserErrorMessage = err.message;
          console.log(err.message);
        }
      });
  }



  cancelAppointment(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llama al método para cancelar el nombramiento
        this.confirmCancellation(id);
      }
    });
  }


  confirmCancellation(id: number) {
    this.authService.cancelAppointments(id)
      .subscribe(res => {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      });
  }



}
