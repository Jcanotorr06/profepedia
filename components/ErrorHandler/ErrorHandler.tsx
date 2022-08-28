import React, { ReactNode, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './'
import { toast } from 'react-toastify';

type Props = {
    children: ReactNode,
    handleReset?: () => void,
    resetKeys?: any[]
}
const ErrorHandler = ({ children, handleReset, resetKeys }:Props) => {
    const handleError = (error:Error, info: {componentStack: string}) => {
        toast.error(error.message)
    }

    return (
        <div>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={handleError}
                onReset={handleReset}
                resetKeys={resetKeys}
            >
                {children}
            </ErrorBoundary>
        </div>
    )
}

export default ErrorHandler