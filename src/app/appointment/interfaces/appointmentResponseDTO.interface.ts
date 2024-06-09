import { PetType } from "./petType.interface";
import { ServiceType } from "./services.interface";

export interface AppointmentResponseDTO {
    id: number;
    name: string;
    lastName: string;
    petName: string;
    rut: string;
    isActive: boolean;
    phone: string;
    email: string;
    date: string;
    time: string;
    isAvailable: boolean;
    serviceType: ServiceType;
    petType: PetType;
}
