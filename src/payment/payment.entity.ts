import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  @Column({ type: 'int', primary: true })
  public id: number;

  @Column({ type: 'int' })
  public balance: number;
}
