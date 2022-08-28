import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({error, resetErrorBoundary}:FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
      {resetErrorBoundary && 
        <button onClick={resetErrorBoundary}>Try Again</button>
      }
    </div>
  )
}

export default ErrorFallback