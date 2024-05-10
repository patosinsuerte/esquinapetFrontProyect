import { AppointmentResponseDTO } from "./appointmentResponseDTO.interface";

export interface UserProfileDTO {

    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    rut: string;
    role: string;
    appointments: AppointmentResponseDTO[]
}