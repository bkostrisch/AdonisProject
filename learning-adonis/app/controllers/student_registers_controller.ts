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

  public async view({ view, params }: HttpContext) {
    const course = await Course.findByOrFail('slug', params.slug)
    const users = await User.query().where('role_id', 1)

    return view.render('pages/admin/courses/students', { course, users })
  }

  public async addStudent({ request, params, response }: HttpContext) {
    console.log(request.input('students_id'))
    console.log(request.input('courseId'))
    const studentsIds = request.input('students_id')
    const courseId = request.input('courseId')

    for (const studentId of studentsIds) {
      await this.studentRegisterService.addStudent(courseId, Number.parseInt(studentId))
    }

    return response.created()
  }

  public async removeStudent({ params, response }: HttpContext) {
    const studentId = params.studentId
    await this.studentRegisterService.removeStudent(params.courseId, studentId)
    return response.noContent()
  }
}
