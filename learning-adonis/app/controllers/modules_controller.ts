import ModuleService from '#services/module_service'
import { HttpContext } from '@adonisjs/core/http'
import Module from '#models/module'
import Course from '#models/course'
import { moduleValidator } from '#validators/module'

export default class ModuleController {
  private moduleService: ModuleService

  constructor() {
    this.moduleService = new ModuleService()
  }

  public async view({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const module = course.id
    const modules = await this.moduleService.listModuleByCourse(module)

    return view.render('pages/admin/courses/video_classes/classes', { course, modules })
  }

  public async index({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const modules = await Module.firstOrFail()

    return view.render('pages/admin/courses/modules/createModule', { course, modules })
  }

  public async create({ request, params, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(moduleValidator)
    await this.moduleService.createModule(params.cursoId, data)
    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }
    session.flash({ success: 'Module created!' })
    return response.redirect().back()
  }
}
