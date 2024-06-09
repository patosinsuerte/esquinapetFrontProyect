import { UserResponseDTO } from "./userResponseDTO.interface";

export interface LoginResponseDTO {
    user: UserResponseDTO;
    jwt: string;
}
