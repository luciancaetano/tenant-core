import { createServiceFor, IBaseRestService } from './RestService';

export const UsersService:IBaseRestService = {
    ...createServiceFor('users'),
};
