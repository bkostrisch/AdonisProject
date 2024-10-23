import StudentRegisterService from '#services/student_register_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentRegistersController {
  private studentRegisterService: StudentRegisterService

  constructor() {
    this.studentRegisterService = new StudentRegisterService()
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
