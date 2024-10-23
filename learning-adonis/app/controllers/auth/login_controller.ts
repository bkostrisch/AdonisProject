import AuthToken from '#models/auth_token'
import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon/src/datetime.js'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response, auth }: HttpContext) {
    // 1. Pegar dados validados da requisição
    const { email, password, isRememberMe } = await request.validateUsing(loginValidator)
    // 2. Verificar as credenciais do usuário
    const user = await User.verifyCredentials(email, password)
    // 3. Fazer login do usuário
    await auth.use('web').login(user, isRememberMe)
    // 4. Redirecionar o usuário para a página inicial
    return response.redirect().toRoute('home')
  }
}
