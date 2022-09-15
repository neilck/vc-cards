import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   sku: string

   @Column()
   description: string

}