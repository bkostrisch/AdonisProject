import vine from '@vinejs/vine'

export const courseValidator = vine.compile(
  vine.object({
    poster: vine.file({ extnames: ['png', 'jpg', 'jpeg', 'gif'], size: '5mb' }).optional(),
    posterUrl: vine.string().optional(),
    title: vine.string().maxLength(100),
    description: vine.string(),
    createdAt: vine.date().optional(),
  })
)
