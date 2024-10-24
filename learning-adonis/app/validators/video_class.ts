import vine from '@vinejs/vine'

export const videoClassValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(100),
    description: vine.string(),
    ytblink: vine.string(),
    createdAt: vine.date().optional(),
  })
)
