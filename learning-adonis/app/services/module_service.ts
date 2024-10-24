import Module from '#models/module'
import { DateTime } from 'luxon'

export default class ModuleService {
  public async createModule(courseId: number, data: any) {
    return await Module.create({
      title: data.title,
      description: data.description,
      courseId,
      createdAt: DateTime.now(),
    })
  }

  public async listModuleByCourse(courseId: number) {
    return await Module.query().where('course_id', courseId).preload('course')
  }
}
