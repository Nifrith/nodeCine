import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';


import {movie} from "./movie";
//This decorator (denoted by the @ symbol) tells type-orm that
//we want to call the database table users
@Entity()
export class movieCategorie {
    @PrimaryGeneratedColumn('uuid')     //Tell Postgre to generate a Unique Key for this column
    id: string;                         //Name of the column is id and type is string
    @Column('text')                     
    categorie: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => movie, movie => movie.movieCategorie)
    movie: movie[];


}