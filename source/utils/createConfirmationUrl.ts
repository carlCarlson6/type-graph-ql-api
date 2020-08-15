import {v4 as createIdV4} from 'uuid';
import { redis } from '../redis';

export const createConfirmationUrl = async (userId: number): Promise<string> => {
    const token = createIdV4();
    await redis.set(token, userId, 'ex', 60*60*24);
    
    const url = `http://localhost:3000/user/confirm/${token}`;
    return url;
}