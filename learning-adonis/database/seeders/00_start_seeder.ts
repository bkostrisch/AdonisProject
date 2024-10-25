import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#enums/roles'
import Course from '#models/course'
import VideoClass from '#models/video_class'
import Module from '#models/module'
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
        fullName: 'Kostrisch',
        email: 'kostrischdeveloper@gmail.com',
        password: '12345678',
      },
      {
        id: 2,
        roleId: Roles.USER,
        fullName: 'Aluno 01',
        email: 'hedwigvonkostrisch@hotmail.com',
        password: '12345678',
      },
      {
        id: 3,
        roleId: Roles.USER,
        fullName: 'Aluno 02',
        email: 'bhvkco.1997@gmail.com',
        password: '12345678',
      },
      {
        id: 4,
        roleId: Roles.USER,
        fullName: 'Aluno 03',
        email: 'aluno@aluno.com',
        password: '12345678',
      },
      {
        id: 5,
        roleId: Roles.USER,
        fullName: 'Aluno 04',
        email: 'aluno4@aluno.com',
        password: '12345678',
      },
    ])

    await Course.createMany([
      {
        id: 1,
        userId: 1,
        title: 'PACE: What it is?',
        description:
          'PACEs data will help us better understand how the ocean and atmosphere exchange carbon dioxide. In addition, it will reveal how aerosols might fuel phytoplankton growth in the surface ocean. Novel uses of PACE data will benefit our economy and society. For example, it will help identify the extent and duration of harmful algal blooms. PACE will extend and expand NASAs long-term observations of our living planet. By doing so, it will take Earths pulse in new ways for decades to come.',
        slug: 'pace-what-it-is',
        posterUrl:
          'https://e360.yale.edu/assets/site/_1500x1500_fit_center-center_80/Svalbard-Plankton-Bloom_NASA.jpg',
      },
      {
        id: 2,
        userId: 1,
        title: 'Machine Learning',
        description:
          'Machine learning (ML) is a type of artificial intelligence (AI) that allows computers to learn and improve from experience without being explicitly programmed',
        slug: 'machine-learning',
        posterUrl:
          'https://www.dataex.com.br/wp-content/uploads/2023/06/Machine-Learning-pode-transformar-meu-negocio-thumbnail-copy-0.jpg',
      },
    ])

    await Module.createMany([
      {
        id: 1,
        title: 'Planktons',
        description:
          'The word “plankton” comes from the Greek for “drifter” or “wanderer.” An organism is considered plankton if it is carried by tides and currents, and cannot swim well enough to move against these forces.',
        courseId: 1,
      },
      {
        id: 2,
        title: 'Aerosol',
        description:
          'An aerosol is a collection of solid or liquid particles suspended in a gas, usually air. Aerosols can be naturally occurring or caused by human activities. They can range in size from a few tens of nanometers to several tens of micrometers.',
        courseId: 1,
      },
      {
        id: 3,
        title: 'Cloud',
        description: 'A visible mass of water droplets or ice crystals suspended in the atmosphere',
        courseId: 1,
      },
      {
        id: 4,
        title: 'Ocean Ecosystem',
        description:
          'An ocean ecosystem is a marine ecosystem that includes the ocean, saltwater bays, seas, inlets, shorelines, and salt marshes. ',
        courseId: 1,
      },
      {
        id: 5,
        title: 'How does ML works?',
        description:
          'Since deep learning and machine learning tend to be used interchangeably, it’s worth noting the nuances between the two. Machine learning, deep learning, and neural networks are all sub-fields of artificial intelligence.',
        courseId: 2,
      },
      {
        id: 6,
        title: 'ML: Methods',
        description: 'Supervised, Unsupervised, Semi-supervised learning',
        courseId: 2,
      },
    ])
  }
}
