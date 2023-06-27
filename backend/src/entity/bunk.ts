import { Column, Entity } from "typeorm";

@Entity()
export class Bunk {
  @Column({ primary: true })
  bunk_sku: string;
}