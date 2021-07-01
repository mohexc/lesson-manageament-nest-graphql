import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto'
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) { }

    async createSutdent(createSutdentInput: CreateStudentInput): Promise<Student> {
        const { lastName, firstName } = createSutdentInput
        const createStudent = this.studentRepository.create({
            id: crypto.randomBytes(6).toString('hex'),
            firstName,
            lastName,
        })
        return this.studentRepository.save(createStudent)
    }

    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find()
    }

    async getStudent(id: string): Promise<Student> {
        const foundStudent = await this.studentRepository.findOne({ id })
        if (!foundStudent) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return foundStudent
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                }
            }
        })
    }

}
