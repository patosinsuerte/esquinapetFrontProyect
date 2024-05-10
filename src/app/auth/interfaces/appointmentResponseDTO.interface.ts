import { PetDTO } from "./petDTO.interface";
import { ServiceTypeDTO } from "./serviceTypeDTO.interface";


export interface AppointmentResponseDTO {

    id: number;
    name: string;
    lastName: string;
    rut: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    pet: PetDTO;
    serviceType: ServiceTypeDTO

}