import Course from '#models/course'
import Module from '#models/module'
import VideoClass from '#models/video_class'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { DateTime } from 'luxon'

export default class CourseService {
  public async createCourse(userId: number, data: any) {
    return await Course.create({
      title: data.title,
      description: data.description,
      userId: userId,
      posterUrl: data.posterUrl,
      createdAt: DateTime.now(),
    })
  }

  public async editCourse(courseId: number, userId: number, data: any) {
    const course = await Course.query()
      .where('id', courseId)
      .andWhere('user_id', userId)
      .firstOrFail()
    course.merge(data)
    await course.save()
    return course
  }

  public async deleteCourse(courseId: number, userId: number) {
    const course = await Course.query()
      .where('id', courseId)
      .andWhere('user_id', userId)
      .firstOrFail()
    await course.delete()
  }

  public async listCourses() {
    return await Course.query()
  }

  public async listCourseByUser(userId: number) {
    return await Course.query().where('user_id', userId).preload('producer')
  }

  public async listModuleByCourse(courseId: number) {
    return await Module.query().where('course_id', courseId).preload('course')
  }

  static async getFormData() {
    const modules = await Module.query().orderBy('name')
    const videoClass = await VideoClass.query()
    return { modules, videoClass }
  }

  static async storePoster(poster: MultipartFile) {
    const fileName = `${cuid()}.${poster.extname}`

    await poster.move(app.makePath('storage/posters'), {
      name: fileName,
    })

    return `/storage/posters/${fileName}`
  }
}
