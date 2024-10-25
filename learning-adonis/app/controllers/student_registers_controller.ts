import Course from '#models/course'
import StudentRegister from '#models/student_register'
import User from '#models/user'
import StudentRegisterService from '#services/student_register_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentRegistersController {
  private studentRegisterService: StudentRegisterService

  constructor() {
    this.studentRegisterService = new StudentRegisterService()
  }

  public async create({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const users = await User.query().where('role_id', 1)

    return view.render('pages/admin/courses/students/students_create', { course, users })
  }

  public async list({ view, params }: HttpContext) {
    const course = await Course.query()
      .where('slug', params.slug)
      .preload('studentClass', (studentClassQuery) => {
        studentClassQuery.preload('studentRegister')
      })
      .firstOrFail()
    const users = await User.query().where('role_id', 1)

    return view.render('pages/admin/courses/students/students_list', { course, users })
  }

  public async addStudent({ session, request, response }: HttpContext) {
    console.log(request.input('students_id'))
    console.log(request.input('courseId'))
    const studentsIds = request.input('students_id')
    const courseId = request.input('courseId')

    for (const studentId of studentsIds) {
      await this.studentRegisterService.addStudent(courseId, Number.parseInt(studentId))
    }
    session.flash({ success: 'Students Registered!' })
    return response.redirect().back()
  }

  public async removeStudent({ params, response }: HttpContext) {
    const studentId = params.studentId
    await this.studentRegisterService.removeStudent(params.courseId, studentId)
    return response.noContent()
  }
}
