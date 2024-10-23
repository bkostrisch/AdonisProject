import CourseService from '#services/course_service'
import Course from '#models/course'
import { HttpContext } from '@adonisjs/core/http'

export default class CoursesController {
  private courseService: CourseService

  constructor() {
    this.courseService = new CourseService()
  }

  public async create({ request, response, auth }: HttpContext): Promise<Course | void> {
    const data = request.only(['title', 'description'])
    const producerId = auth.user?.id
    const course = await this.courseService.createCourse(producerId, data)
    return response.created(course)
  }

  public async list({ response, auth }: HttpContext) {
    const producerId = auth.user?.id
    const courses = await this.courseService.listCourse(producerId)
    return response.ok(courses)
  }

  public async edit({ request, params, response, auth }: HttpContext) {
    const data = request.only(['title', 'description'])
    const producerId = auth.user?.id
    const course = await this.courseService.editCourse(params.id, producerId, data)
    return response.ok(course)
  }

  public async delete({ params, response, auth }: HttpContext) {
    const producerId = auth.user?.id
    await this.courseService.deleteCourse(params.id, producerId)
    return response.noContent()
  }
}
