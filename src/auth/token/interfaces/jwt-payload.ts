import { UserGrant } from "src/commons/types/user-grant";

export interface JwtPayload {
    id: string;
    email: string;
    name: string;
    userGrant: UserGrant;
}
