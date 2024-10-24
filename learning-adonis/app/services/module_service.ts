import Module from '#models/module'
import VideoClass from '#models/video_class'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'

export default class ModuleService {
  public async createModule(courseId: number, data: any) {
    console.log('aqui', courseId)
    return await Module.create({
      title: data.title,
      description: data.description,
      courseId,
      createdAt: DateTime.now(),
    })
  }

  public async addVideoClass(moduleId: number, data: any) {
    if (!data.link.includes('youtube.com')) {
      throw new Exception('Only Youtube link will be accepted.')
    }
    return await VideoClass.create({
      title: data.title,
      description: data.description,
      ytblink: data.ytblink,
      moduleId: moduleId,
    })
  }
}
