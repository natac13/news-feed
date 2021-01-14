import { useState, useEffect } from 'react'

import { NewsResponse } from '../types/newsResponse'

const NEWS_URL = `https://newsapi.org/v2/top-headlines`

const API_KEY = process.env.REACT_APP_NEWS_FEED_API

const useNewsArticles = (country = 'ca', category = 'general', page = 1) => {
  const url = `${NEWS_URL}?country=${country}&category=${category}&page=${page}&apiKey=${API_KEY}`

  const [response, setResponse] = useState<NewsResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // trigger is for refetch action
  const [trigger, setTrigger] = useState(false)

  const refetch = () => {
    setTrigger((state) => !state)
  }

  useEffect(() => {
    if (!url) {
      return
    }

    const makeRequest = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResponse(json)
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }

    makeRequest()
  }, [url, trigger])

  return { response, error, isLoading, refetch }
}
  //comment to flag this file for code review
export default useNewsArticles
