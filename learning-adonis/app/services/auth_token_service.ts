import AuthToken from '#models/auth_token'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

@inject()
export default class AuthTokenService {
  constructor() {}

  public async createToken(userId: number, type: number): Promise<AuthToken> {
    const token = uuidv4()
    const authToken = await AuthToken.create({
      userId,
      token,
      type,
      expiresAt: DateTime.now().plus({ minutes: 5 }),
    })

    return authToken
  }

  public async findByToken(token: string): Promise<AuthToken | null> {
    const authToken = await AuthToken.query()
      .where('token', token)
      .andWhere('expiresAt', '>', DateTime.now().toSQL())
      .first()

    return authToken
  }

  public async revokeToken(token: string): Promise<boolean> {
    const authToken = await this.findByToken(token)
    if (authToken) {
      await authToken.delete()
      return true
    }
    return false
  }

  public async isValidToken(token: string): Promise<AuthToken | null> {
    const authToken = await this.findByToken(token)
    return authToken
  }

  public static generateTokenLoginHtmlUrl(token: string): string {
    const host = process.env.HOST || 'localhost'
    const port = process.env.PORT || '3333'
    const url = `http://${host}:${port}/auth/token/verify/${token}`

    return `This is the link to access the platform <a href="${url}" >Click Here and start to learn</a>`
  }
}
