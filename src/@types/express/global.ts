import { IUser } from "../../interface/IUser";

declare global {
    namespace Express {
        export interface Request {
            user?: Partial<IUser>
        }
    }
}


export { };