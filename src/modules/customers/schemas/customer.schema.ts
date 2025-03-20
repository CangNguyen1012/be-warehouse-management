import { Schema } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: 'createdTime', updatedAt: 'modifiedTime' } })
export class Customer {}
