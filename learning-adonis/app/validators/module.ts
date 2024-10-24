import vine from '@vinejs/vine'

export const moduleValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(100),
    description: vine.string(),

    createdAt: vine.date().optional(),
  })
)
