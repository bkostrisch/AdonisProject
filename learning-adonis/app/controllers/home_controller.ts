import Course from '#models/course'
import CourseService from '#services/course_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  private courseService: CourseService

  constructor() {
    this.courseService = new CourseService()
  }

  async index({ view, auth, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }
    const courses =
      auth.user.roleId === 1
        ? await this.courseService.listCourseByStudent(auth.user.id)
        : await this.courseService.listCourseByProducer(auth.user.id)

    return view.render('pages/home', { courses })
  }
}
