import Course from '#models/course'

export default class CourseService {
  public async createCourse(userId: number, data: any) {
    return await Course.create({
      title: data.title,
      description: data.description,
      producerId: userId,
    })
  }

  public async editCourse(courseId: number, userId: number, data: any) {
    const course = await Course.query()
      .where('id', courseId)
      .andWhere('user_id', userId)
      .firstOrFail()
    course.merge(data)
    await course.save()
    return course
  }

  public async deleteCourse(courseId: number, userId: number) {
    const course = await Course.query()
      .where('id', courseId)
      .andWhere('user_id', userId)
      .firstOrFail()
    await course.delete()
  }

  public async listCourse(userId: number) {
    return await Course.query().where('user_id', userId)
  }
}
