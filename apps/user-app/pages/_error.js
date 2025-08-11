// Simple error page without React context dependencies
export default function Error({ statusCode }) {
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f9fafb',
      color: '#374151',
      textAlign: 'center',
      padding: '20px'
    }
  }, React.createElement('div', null, 
    React.createElement('h1', {
      style: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }
    }, statusCode ? `Error ${statusCode}` : 'An error occurred'),
    React.createElement('p', {
      style: { marginBottom: '24px', color: '#6b7280' }
    }, 'Something went wrong. Please try again.'),
    React.createElement('button', {
      onClick: () => window.location.href = '/',
      style: {
        padding: '8px 16px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }
    }, 'Go Home')
  ));
}

// Using vanilla React without JSX to avoid context issues
const React = require('react');

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};