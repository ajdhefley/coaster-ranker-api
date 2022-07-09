import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { CoasterEntity } from '../../coasters/models/coaster.entity';

@Entity('Reviews')
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @JoinColumn({ name: 'coasterId' })
    @ManyToOne(type => CoasterEntity, c => c.reviews, {  })
    coaster: CoasterEntity;
}
