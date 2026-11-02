import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { PreviewServer, ViteDevServer } from 'vite'

function installMockOnboardingApi(
  server: Pick<ViteDevServer, 'middlewares'> | Pick<PreviewServer, 'middlewares'>,
) {
  server.middlewares.use('/api/onboarding', (request, response, next) => {
    if (request.method !== 'POST') {
      next()
      return
    }

    const chunks: Buffer[] = []
    request.on('data', (chunk: Buffer) => chunks.push(chunk))
    request.on('end', () => {
      let payload: { selectedPath?: unknown }
      try {
        payload = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      } catch {
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({ message: 'The request body must be valid JSON.' }))
        return
      }

      setTimeout(() => {
        response.setHeader('Content-Type', 'application/json')

        if (payload.selectedPath === 'managed') {
          response.statusCode = 400
          response.end(
            JSON.stringify({
              message: 'HTTP 400: The selected investment path could not be submitted.',
            }),
          )
          return
        }

        if (payload.selectedPath !== 'self_directed') {
          response.statusCode = 400
          response.end(JSON.stringify({ message: 'A valid investment path is required.' }))
          return
        }

        response.statusCode = 200
        response.end(
          JSON.stringify({
            status: 200,
            selectedPath: payload.selectedPath,
            message: 'Your onboarding selection has been submitted successfully.',
          }),
        )
      }, 700)
    })
  })
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-onboarding-api',
      configureServer: installMockOnboardingApi,
      configurePreviewServer: installMockOnboardingApi,
    },
  ],
})
