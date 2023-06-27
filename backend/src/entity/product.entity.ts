import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Product {
    
    @PrimaryColumn()
    sku: string

    @Column()
    name: string
    
    @Column('decimal', { precision: 7, scale: 2 })
    price: any

    @Column()
    thumbnail: string
}