import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Product } from "./product.entity";
import { Bunk } from "./bunk";

@Entity()
@Unique(['bunk_sku', 'product_sku'])
export class Location {

  @PrimaryColumn()
  bunk_sku: string;

  @PrimaryColumn()
  product_sku: string;

  @ManyToOne(() => Product, product => product.sku)
  @JoinColumn({ name: 'product_sku' })
  product: Product;

  @ManyToOne(() => Bunk, location => location.bunk_sku)
  @JoinColumn({ name: 'bunk_sku' })
  location: Bunk;
}