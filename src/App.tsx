import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Dummy API call to JSONPlaceholder
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
        const data = await response.json()
        setApiData(data)
      } catch (err) {
        setError('Failed to fetch data')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {loading ? (
          'Loading API data...'
        ) : error ? (
          `Error: ${error}`
        ) : (
          <pre style={{ textAlign: 'left', fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(apiData, null, 2)}
          </pre>
        )}
      </p>
    </>
  )
}

export default App
