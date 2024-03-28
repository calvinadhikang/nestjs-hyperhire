import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    writer: string;

    @Column()
    image: string;

    @Column({
        type: 'bigint'
    })
    price: number;

    @Column()
    tag_id: number;
}