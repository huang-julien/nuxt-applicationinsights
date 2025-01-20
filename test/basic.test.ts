import { describe, it, expect } from 'vitest'
import { $fetch, setup, fetch } from "@nuxt/test-utils/e2e"
import { fileURLToPath } from 'node:url'



await setup({
  rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  dev: false
})

describe('api', () => {
  const dummyTrace = '00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01'
  it('expect to have the same trace id', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const data  = await $fetch<{
      trace: string
      initialTrace: string
    }>('/api', {
      headers: {
        'traceparent': dummyTrace
      }
    })

    expect(data).toBeDefined()
    // should have the same op id
    expect(data!.trace.split('-')[1]).toBe(dummyTrace.split('-')[1])
  })

  it('expect error to have the same trace id', async () => {
    const { headers, status } = await fetch('/api/error', {
      headers: {
        'traceparent': dummyTrace
      }
    })

    expect(status).toBeGreaterThan(399)
    expect(headers.get('x-trace')?.split('-')[1]).toBe(dummyTrace.split('-')[1])
  })

  it('expect dependency to have the same operation id as the request', async () => {
    const data = await $fetch<{
      trace: string
      dependencyTrace: string
    }>('/api/with-dependency').catch(e => console.log(e))

    expect(data).toBeDefined() 
    expect(data!.dependencyTrace.split('-')[1]).toBe(data!.trace.split('-')[1])
  })
})