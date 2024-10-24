import VideoClass from '#models/video_class'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'

export default class VideoClassService {
  public async addVideoClass(moduleId: number, data: any) {
    if (!data.ytblink.includes('youtube.com')) {
      throw new Exception('Only Youtube link will be accepted.')
    }
    return await VideoClass.create({
      title: data.title,
      description: data.description,
      ytblink: data.ytblink,
      moduleId,
      createdAt: DateTime.now(),
    })
  }

  public async listVideoClassByModule(moduleId: number) {
    return await VideoClass.query().where('module_id', moduleId).preload('module')
  }
}
