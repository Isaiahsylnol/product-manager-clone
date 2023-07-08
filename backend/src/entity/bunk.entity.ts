import {
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { ProductLocation } from "./product_location.entity";

@Entity()
export class Bunk {
  @PrimaryColumn()
  sku: string;

  @ManyToMany(() => Product, (product) => product.productLocations)
  products: Product[];

  @OneToMany(() => ProductLocation, (location) => location.bunk, {
    eager: true,
  })
  productLocations: ProductLocation[];
}
