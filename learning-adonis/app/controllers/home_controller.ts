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
    const producerId = auth.user.id

    const courses = await this.courseService.listCourseByUser(producerId)

    return view.render('pages/home', { courses })
  }
}
