import Course from '#models/course'
import User from '#models/user'
import StudentRegisterService from '#services/student_register_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentRegistersController {
  private studentRegisterService: StudentRegisterService

  constructor() {
    this.studentRegisterService = new StudentRegisterService()
  }

  public async view({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const users = await User.query().select('full_name').where('role_id', 1)

    return view.render('pages/admin/courses/students', { course, users })
  }

  public async addStudent({ request, params, response }: HttpContext) {
    const studentId = request.input('studentId')
    const studentRegister = await this.studentRegisterService.addStudent(params.cursoId, studentId)
    return response.created(studentRegister)
  }

  public async removeStudent({ params, response }: HttpContext) {
    const studentId = params.studentId
    await this.studentRegisterService.removeStudent(params.courseId, studentId)
    return response.noContent()
  }
}
