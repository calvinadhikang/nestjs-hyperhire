import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { DetailTransaction } from "./detail-transaction.entity";

enum TransactionStatus {
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    CANCELED = 'Canceled'
}

@Entity()
export class HeaderTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING
    })
    status: TransactionStatus

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'        
    })
    createdAt: Date

    @OneToMany(() => DetailTransaction, detail => detail.header)
    detail: DetailTransaction[];
}