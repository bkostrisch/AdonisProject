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

    console.log('curso id', courseId)
    let studentClass = await StudentClass.query()
      .where('course_id', courseId)
      .whereRaw(
        '(SELECT COUNT(*) FROM student_registers WHERE student_class_id = student_classes.id AND deleted_at IS NULL) < student_classes.capacity'
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

    /*await mail.send((message) => {
      message
        .to(student.email)
        .from('no-reply@curso.com')
        .subject(`Welcome to the Course`)
        .htmlView('emails.bemvindo', { curso: courseId })
    })
        */

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
