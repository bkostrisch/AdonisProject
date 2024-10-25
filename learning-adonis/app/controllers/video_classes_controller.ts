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

  public async create({ session, request, response, params }: HttpContext) {
    const data = await request.validateUsing(videoClassValidator)
    const videoclass = await this.videoClass.addVideoClass(params.moduleId, data)

    session.flash({ success: 'Class created!' })
    return response.redirect().back()
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

  public async list({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const modules = await Module.query()
      .where('id', params.moduleId)
      .preload('videoClass')
      .firstOrFail()

    return view.render('pages/admin/courses/video_classes/classes_list', {
      course,
      modules,
    })
  }

  public async softDelClass({ response, params }: HttpContext) {
    const videoClass = await VideoClass.findOrFail(params.id)
    await videoClass.softDelete()
    return response.redirect().back()
  }
}
