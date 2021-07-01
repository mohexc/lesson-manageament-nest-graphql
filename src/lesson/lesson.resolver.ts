
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { Lesson } from "./lesson.entity";
import { AssignStudentsToLessonInput, CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";


@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentServcie: StudentService
    ) { }
    @Query((returns) => LessonType)
    lesson(@Args('id') id: string,) {
        return this.lessonService.getLesson(id)
    }

    @Query((returns) => [LessonType])
    lessons() {
        return this.lessonService.getLessons()
    }

    @Mutation((returns) => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput,) {
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation((returns) => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput) {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput)
    }

    @ResolveField()
    async students(@Parent() lessson: Lesson) {
        return this.studentServcie.getManyStudents(lessson.students)
    }
}