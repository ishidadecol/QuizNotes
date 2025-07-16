export interface Quiz {
    id : string
    questions : Question[];
}

export interface Question{
    id: string;
    question: string;
    answer: string;
    quizId: string;
}