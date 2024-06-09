import { AppointmentDTO } from "../../appointment/interfaces/appointment.interface";
import { AppointmentResponseDTO } from "../../appointment/interfaces/appointmentResponseDTO.interface";


export interface UserResponseDTO {

    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    rut: string;
    role: string;
    isActive: boolean;
    appointments: AppointmentResponseDTO[] | null;
}