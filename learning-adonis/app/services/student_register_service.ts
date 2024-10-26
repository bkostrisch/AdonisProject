import StudentClass from '#models/student_class'
import StudentRegister from '#models/student_register'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import MailService from './mail_service.js'

export default class StudentRegisterService {
  private mailService: MailService

  constructor() {
    this.mailService = new MailService()
  }

  public async addStudent(courseId: number, studentId: number) {
    const student = await User.find(studentId)
    if (!student) {
      throw new Error('Student does not exist')
    }

    let studentClass = await StudentClass.query()
      .where('course_id', courseId)
      .whereRaw(
        '(SELECT COUNT(*) FROM student_registers WHERE student_class_id = student_classes.id) < student_classes.capacity'
      )
      .first()

    if (!studentClass) {
      studentClass = await StudentClass.createStudentClass(courseId)
    }

    const studentRegister = await StudentRegister.create({
      studentId,
      studentClassId: studentClass.id,
      expiresAt: DateTime.now().plus({ days: 30 }),
    })

    await this.mailService.sendEmail(
      student.email,
      'Welcome to the course',
      `Você foi inserido no curso', ${courseId} `
    )

    return studentRegister
  }

  public async removeStudent(courseId: number, studentId: number) {
    const studentRegister = await StudentRegister.query()
      .where('course_id', courseId)
      .andWhere('student_id', studentId)
      .firstOrFail()

    await studentRegister.delete()
  }
}
