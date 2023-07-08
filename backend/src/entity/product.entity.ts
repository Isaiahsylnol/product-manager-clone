import { Column, JoinTable, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ProductLocation } from "./product_location.entity";

@Entity()
export class Product {
  @PrimaryColumn()
  sku: string

  @Column()
  name: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column()
  thumbnail: string
  
  @Column()
  description: string

  @OneToMany(() => ProductLocation, (location) => location.product, { eager: true })
  @JoinTable()
  productLocations: ProductLocation[];
}