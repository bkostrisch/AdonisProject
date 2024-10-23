import Module from '#models/module'
import VideoClass from '#models/video_class'
import { Exception } from '@adonisjs/core/exceptions'

export default class ModuleService {
  public async createModule(courseId: number, data: any) {
    return await Module.create({
      title: data.title,
      description: data.description,
      courseId: courseId,
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
