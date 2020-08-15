import {v4 as createIdV4} from 'uuid';
import { redis } from '../../redis';

export const createUrl = async (userId: number, path: string, prefix: string): Promise<string> => {
    const token = prefix+createIdV4();
    await redis.set(token, userId, 'ex', 60*60*24);
    
    const url = `http://localhost:3000/${path}/${token}`;
    return url;
}