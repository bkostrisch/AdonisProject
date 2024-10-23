import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'

@inject()
export default class MailService {
  public async sendEmail(email: string, subject: string, content: string): Promise<void> {
    try {
      await mail.send((message) => {
        message.to(email).subject(subject).html(content)
      })
      console.log('Email enviado com sucesso')
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
    }
  }
}
