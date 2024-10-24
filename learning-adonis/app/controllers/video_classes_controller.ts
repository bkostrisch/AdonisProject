import type { HttpContext } from '@adonisjs/core/http'
import Course from '#models/course'
import Module from '#models/module'
import { videoClassValidator } from '#validators/video_class'
import VideoClassService from '#services/video_class_service'
import VideoClass from '#models/video_class'

export default class VideoClassesController {
  private videoClass: VideoClassService

  constructor() {
    this.videoClass = new VideoClassService()
  }

  public async view({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const modules = await Module.query()
      .where('id', params.moduleId)
      .preload('videoClass')
      .firstOrFail()

    return view.render('pages/admin/courses/video_classes/classes', {
      course,
      modules,
    })
  }

  public async create({ view, request, response, params }: HttpContext) {
    const data = await request.validateUsing(videoClassValidator)
    const videoclass = await this.videoClass.addVideoClass(params.moduleId, data)

    return response.created(videoclass)
  }

  public async index({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const modules = await Module.query()
      .where('id', params.moduleId)
      .preload('videoClass')
      .firstOrFail()

    return view.render('pages/admin/courses/video_classes/createClasses', {
      course,
      modules,
    })
  }
}
