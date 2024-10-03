import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from './note';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ type: 'varchar', length: 255 })
    employer: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ name: 'company_id', type: 'int', nullable: true })
    companyId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    link: string;

    @OneToMany(() => Note, (note) => note.application, { cascade: true })
    notes?: Note[];
}
