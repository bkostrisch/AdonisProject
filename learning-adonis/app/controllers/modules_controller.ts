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

  public async index({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const modules = await Module.firstOrFail()

    console.log(modules)
    console.log(modules.title)

    return view.render('pages/admin/courses/modules/createModule', { course, modules })
  }

  public async create({ request, params, response, auth }: HttpContext) {
    const data = await request.validateUsing(moduleValidator)
    const module = await this.moduleService.createModule(params.cursoId, data)

    if (!auth.user) {
      return response.unauthorized('You must be logged in to create a course')
    }

    return response.created(module)
  }

  public async addVideoClass({ request, params, response }: HttpContext) {
    const data = request.only(['title', 'description', 'ytblink'])
    const module = await this.moduleService.addVideoClass(params.moduleId, data)
    return response.created(module)
  }
}
