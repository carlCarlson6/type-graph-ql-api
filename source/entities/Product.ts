import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity({name:"typegraphqlapi-product"})
export class Product extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

}