import StudentClass from '#models/student_class'
import StudentRegister from '#models/student_register'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

export default class StudentRegisterService {
  public async addStudent(courseId: number, studentId: number) {
    const student = await User.find(studentId)
    if (!student) {
      throw new Error('Student does not exist')
    }

    let studentClass = await StudentClass.query()
      .where('course_id', courseId)
      .andWhereHas(
        'studentRegister',
        (query) => {
          query.where('status', 'active')
        },
        '<',
        10
      )
      .first()

    if (!studentClass) {
      studentClass = await StudentClass.create({ courseId })
    }

    const studentRegister = await StudentRegister.create({
      studentId,
      studentClassId: studentClass.id,
      courseId: courseId,
      expiresAt: DateTime.now().plus({ days: 30 }),
    })

    await mail.send((message) => {
      message
        .to(student.email)
        .from('no-reply@curso.com')
        .subject(`Welcome to the Course`)
        .htmlView('emails.bemvindo', { curso: courseId })
    })

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
