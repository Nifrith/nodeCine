import {Entity, Column, PrimaryGeneratedColumn,ManyToOne,  CreateDateColumn,
    UpdateDateColumn,} from "typeorm";
import {movieCategorie} from "./movieCategorie";

@Entity()
export class cinema{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cinemaName: string;

    @Column()
    cinemaAdress: string;

    @Column()
    cinemaPhone: number;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    


}