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
    const course = await Course.query()
      .where('slug', params.slug)
      .preload('producer')
      .preload('module')
      .preload('studentClass', (studentClassQuery) => {
        studentClassQuery.preload('studentRegister')
      })
      .firstOrFail()

    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }

    return view.render('pages/admin/courses/show', { course })
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

    return view.render('pages/admin/courses/courses_list', { courses })
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

  public async softDelClass({ response, params }: HttpContext) {
    const course = await Course.findOrFail(params.id)
    await course.softDelete()
    return response.redirect().back()
  }
}
