import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import * as crypto from 'crypto'
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) { }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonInput
        const createLesson = this.lessonRepository.create({
            id: crypto.randomBytes(6).toString('hex'),
            name,
            startDate,
            endDate
        })

        return this.lessonRepository.save(createLesson)
    }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find()
    }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id })
    }

}
