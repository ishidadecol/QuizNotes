import { Quiz } from "../quizes/quiz.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;
  
  @Column()
  date: Date;

  @OneToOne(() => Quiz)
  @JoinColumn()
  quiz: Quiz
}
