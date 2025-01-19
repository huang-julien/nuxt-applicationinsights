import { defineEventHandler } from "#imports"

export default defineTracedEventHandler(() => Math.floor(Math.random() * 100))