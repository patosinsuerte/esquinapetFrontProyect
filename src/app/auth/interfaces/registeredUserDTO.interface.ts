
import { AppointmentResponseDTO } from "../../appointment/interfaces/appointmentResponseDTO.interface";

export interface RegisteredUserResponse {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    rut: string;
    role: string;
    isActive: boolean;
    jwt: string;
    appointments: AppointmentResponseDTO[] | null;
}