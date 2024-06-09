
import { AppointmentResponseDTO } from "../../appointment/interfaces/appointmentResponseDTO.interface";

export interface UserProfileDTO {

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