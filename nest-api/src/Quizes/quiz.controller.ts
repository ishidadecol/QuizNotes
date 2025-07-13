import { Controller, Get, Post, Render } from "@nestjs/common";

@Controller('quizzes')
export class QuizController {
    //MARK: Get /quizzes
    @Get()
    getAllQuizzes() {
        
    }

    //MARK: Get /:noteId
    @Get(':id')
    getQuizById() {

    }

    //MARK: POST /new
    @Post()
    createNewQuiz() {

    }
    
}