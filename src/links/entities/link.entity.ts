import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Link extends Document{
    @Prop({ unique: false })
    url: string;

    @Prop({ unique: true, index: true })
    shortUrl: string;
    
    @Prop({ unique: false })
    visited: number;

    @Prop({ unique: false })
    createdAt: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);