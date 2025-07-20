import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn("uuid")
    id : string

    @OneToMany(() => Question, (question) => question.quiz)
    questions : Question[];
}

@Entity()
export class Question{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    question: string;

    @Column()
    answer: string;
    
    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz;
}