"use client"
import { Suspense, lazy, ComponentType } from "react"

interface LazyWrapperProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export function LazyWrapper({ fallback, children }: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export function withLazyLoading<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback: React.ReactNode
) {
  const LazyComponent = lazy(importFn)
  
  return function WrappedComponent(props: any) {
    return (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...props} />
      </LazyWrapper>
    )
  }
}