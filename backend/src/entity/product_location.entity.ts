import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "./product.entity";
import { Bunk } from "./bunk.entity";

@Entity()
@Unique(['product', 'bunk'])
export class ProductLocation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Product, (product) => product.sku)
  product: Product;

  @ManyToOne(() => Bunk, (bunk) => bunk.products)
  bunk: Bunk;
}