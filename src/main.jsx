import React from 'react'
import ReactDOM from 'react-dom/client'
import MiowNation from './App'
import { ErrorBoundary } from './components/common'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MiowNation />
    </ErrorBoundary>
  </React.StrictMode>,
)