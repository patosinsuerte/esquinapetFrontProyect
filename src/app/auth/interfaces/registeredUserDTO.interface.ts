import { AppointmentResponseDTO } from "./appointmentResponseDTO.interface";

export interface RegisteredUserDTO {

    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    rut: string;
    role: string;
    jwt: string;
    appointments: AppointmentResponseDTO;
}