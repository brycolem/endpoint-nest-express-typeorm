import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Application } from './application';

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({ name: 'application_id', type: 'int' })
    applicationId: string;

    @Column({ name: 'note_text', type: 'varchar', length: 255, nullable: true })
    noteText: string;

    @ManyToOne(() => Application, (application) => application.notes)
    @JoinColumn({ name: 'application_id' })
    application: Application;
}
