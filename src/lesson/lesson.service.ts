import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import * as crypto from 'crypto'
import { AssignStudentsToLessonInput, CreateLessonInput } from './lesson.input';
import { Student } from 'src/student/student.entity';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) { }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput
        const createLesson = this.lessonRepository.create({
            id: crypto.randomBytes(6).toString('hex'),
            name,
            startDate,
            endDate,
            students
        })

        return this.lessonRepository.save(createLesson)
    }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find()
    }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id })
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput,): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLessonInput
        const lesson = await this.lessonRepository.findOne({ id: lessonId })
        lesson.students = [...lesson.students, ...studentIds]
        const sevedLesson = await this.lessonRepository.save(lesson)
        return sevedLesson
    }


}
