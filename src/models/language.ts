import {Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn,
    UpdateDateColumn,OneToMany} from "typeorm";
    import {movie} from "./movie";

@Entity()
export class language{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    language: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;


    


}