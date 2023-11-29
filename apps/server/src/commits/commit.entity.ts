import { z } from 'zod'
import { generateSchema } from '@anatine/zod-openapi'

export const basicCommitSchema = z.object({
  sha: z.string(),
  node_id: z.string(),
  commit: z.object({
    author: z.object({
      name: z.string(),
      email: z.string(),
      date: z.string()
    }),
    message: z.string(),
    tree: z.object({
      sha: z.string(),
      url: z.string()
    })
  }),
  url: z.string(),
  html_url: z.string(),
  parents: z.object({
    sha: z.string(),
    url: z.string()
  }).array(),
  author: z.object({
    avatar_url: z.string(),
    html_url: z.string()
  })
})

export const commitList = z.array(basicCommitSchema)

export type CommitList = z.infer<typeof commitList>

export const commitApiSchema = generateSchema(basicCommitSchema)
