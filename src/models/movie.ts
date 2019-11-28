import {Entity, Column, PrimaryGeneratedColumn,ManyToOne,  CreateDateColumn,
    UpdateDateColumn,} from "typeorm";
import {movieCategorie} from "./movieCategorie";

@Entity()
export class movie{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movieName: string;
 
    @ManyToOne(type => movieCategorie, movieCategorie => movieCategorie.movie)
    movieCategorie: movieCategorie;


    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    


}