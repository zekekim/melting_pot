import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient = new PrismaClient()

export const db = prisma
