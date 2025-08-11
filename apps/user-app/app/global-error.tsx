'use client'

export default function GlobalError({
  reset,
}: {
  error?: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <head>
        <title>Application Error - InstantPay</title>
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #fef2f2, #ffffff, #fef2f2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '28rem',
            margin: '0 auto'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                backgroundColor: '#fecaca',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <svg style={{ width: '2.5rem', height: '2.5rem', color: '#dc2626' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>Application Error</h1>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem'
              }}>
                A critical error occurred. Please refresh the page to continue.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626'}
              >
                Refresh Application
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  color: '#dc2626',
                  fontWeight: '500',
                  textDecoration: 'underline',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.color = '#b91c1c'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.color = '#dc2626'}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}