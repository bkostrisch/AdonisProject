import vine from '@vinejs/vine'

export const studentValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(100),
    description: vine.string(),
    ytblink: vine.string(),
    createdAt: vine.date().optional(),
  })
)
