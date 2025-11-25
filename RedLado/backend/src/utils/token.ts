import { randomUUID } from 'crypto';

export const createMockToken = (userId: string): string => `${userId}-${randomUUID()}`;


