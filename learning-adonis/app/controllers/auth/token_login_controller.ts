import TokenType from '#enums/token'
import AuthToken from '#models/auth_token'
import User from '#models/user'
import AuthTokenService from '#services/auth_token_service'
import MailService from '#services/mail_service'
import { emailValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

@inject()
export default class TokenLoginController {
  constructor(
    protected mailService: MailService,
    protected authTokenService: AuthTokenService
  ) {}
  async show({ view }: HttpContext) {
    return view.render('pages/auth/token')
  }

  async sendToken({ view, request, response, session }: HttpContext) {
    const { email } = await request.validateUsing(emailValidator)
    const user = await User.findBy('email', email)
    if (!user) {
      session.flash('error', 'E-mail não encontrado')
      return response.redirect('back')
    }
    const authToken = await this.authTokenService.createToken(user.id, AuthToken.ACCESS_TOKEN)
    await this.mailService.sendEmail(
      email,
      AuthToken.EMAIL_SUBJECT,
      AuthTokenService.generateTokenLoginHtmlUrl(authToken.token)
    )
    return view.render('pages/auth/token')
  }

  async store({ request, response, auth }: HttpContext) {
    const email = await request.validateUsing(emailValidator)
    const user = await User.findByOrFail('email', email.email)
    await auth.use('web').login(user)
    return response.redirect().toRoute('home')
  }

  async validateToken({ request, response, auth }: HttpContext): Promise<AuthToken | void> {
    const params = request.params()
    const hashToken = params.token

    const authToken = await this.authTokenService.isValidToken(hashToken)

    if (!authToken) {
      return response.status(400).json({
        message: 'Token inválido ou expirado',
      })
    }
    const user = await User.find(authToken.userId)
    if (!user) {
      return response.status(400).json({
        message: 'Usuário não encontrado',
      })
    }
    await auth.use('web').login(user)
    return response.redirect().toRoute('home')
  }
}
