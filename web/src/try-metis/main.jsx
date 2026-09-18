import React from 'react'
import { createRoot } from 'react-dom/client'
import '../tokens.css'
import '../styles.css'
import './try-metis.css'
import TryMetis from './TryMetis'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TryMetis />
  </React.StrictMode>,
)
