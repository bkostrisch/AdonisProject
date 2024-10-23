import ModuleService from '#services/module_service'
import { HttpContext } from '@adonisjs/core/http'

export default class ModuleController {
  private moduleService: ModuleService

  constructor() {
    this.moduleService = new ModuleService()
  }

  public async create({ request, params, response }: HttpContext) {
    const data = request.only(['title', 'description'])
    const module = await this.moduleService.createModule(params.cursoId, data)
    return response.created(module)
  }

  public async addVideoClass({ request, params, response }: HttpContext) {
    const data = request.only(['title', 'description', 'ytblink'])
    const module = await this.moduleService.addVideoClass(params.moduleId, data)
    return response.created(module)
  }
}
