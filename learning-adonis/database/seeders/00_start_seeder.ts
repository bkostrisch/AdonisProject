import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#enums/roles'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])

    await User.createMany([
      {
        id: 1,
        roleId: Roles.ADMIN,
        fullName: 'Produtor',
        email: 'tokendasilvateste@gmail.com',
      },
      {
        id: 2,
        roleId: Roles.USER,
        fullName: 'Aluno',
        email: 'tokentesteadonis@gmail.com',
      },
    ])
  }
}
