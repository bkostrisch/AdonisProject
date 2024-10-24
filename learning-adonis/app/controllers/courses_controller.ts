import CourseService from '#services/course_service'
import Course from '#models/course'
import { HttpContext } from '@adonisjs/core/http'
import Module from '#models/module'
import { courseValidator } from '#validators/course'

export default class CoursesController {
  private courseService: CourseService

  constructor() {
    this.courseService = new CourseService()
  }

  public async index({ view }: HttpContext) {
    const modules = await Module.query()
    return view.render('pages/admin/courses/createOrEdit', { modules })
  }

  public async show({ view, params, auth, response }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const producer = await Course.query()
      .preload('producer')
      .firstOrFail()
      .then((courses) => courses.producer)

    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }
    const moduleId = course.id
    const modules = await this.courseService.listModuleByCourse(moduleId)

    return view.render('pages/admin/courses/show', { course, producer, modules })
  }

  public async create({ request, response, auth }: HttpContext) {
    const { poster, ...data } = await request.validateUsing(courseValidator)

    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }

    if (poster) {
      data.posterUrl = await CourseService.storePoster(poster)
    }

    const producerId = auth.user.id
    const course = await this.courseService.createCourse(producerId, data)

    return response.redirect().toRoute('home')
  }

  public async list({ response, auth, view }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }
    const producerId = auth.user.id
    const courses = await this.courseService.listCourseByUser(producerId)

    return view.render('pages/marge', { courses })
  }

  public async edit({ request, params, response, auth }: HttpContext) {
    const data = request.only(['title', 'description'])
    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }

    const producerId = auth.user.id
    const course = await this.courseService.editCourse(params.id, producerId, data)
    return response.ok(course)
  }

  public async delete({ params, response, auth }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }
    const producerId = auth.user.id
    await this.courseService.deleteCourse(params.id, producerId)
    return response.noContent()
  }
}
