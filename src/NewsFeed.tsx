import React, { useState } from 'react'
import format from 'date-fns/fp/format'
import './App.css'
import useNewsArticles from './hooks/useNewsArticles'
import ButtonGroup from './ButtonGroup'

const DEFAULT_PAGE_SIZE = 20

const NewsFeed: React.FC = () => {
  // options for query
  const [country, setCountry] = useState('ca')
  const [category, setCategory] = useState('general')
  const [page, setPage] = useState(1)

  // fetch
  const { isLoading, response, error, refetch } = useNewsArticles(
    country,
    category,
    page
  )

  // create news feed cards
  const feed =
    response?.articles.map((article) => (
      <li key={article.url} className="news-card">
        <article>
          <figure>
            <img
              className="image"
              src={article.urlToImage}
              alt={article.title}
            />
            <figcaption className="caption">{article.source.name}</figcaption>
          </figure>
          <header>
            <h3>{article.title}</h3>
            <h4>by: {article.author ?? 'Unknown'}</h4>
            {article.publishedAt ? (
              <p>
                <em>Written: </em>
                <time dateTime={article.publishedAt}>
                  {format('PPP', new Date(article.publishedAt))}
                </time>
              </p>
            ) : null}
          </header>
          <p>{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            title={article.title}
            rel="noreferrer"
          >
            Read More!
          </a>
        </article>
      </li>
    )) ?? null

  // check is next button should be disabled
  const total = response?.totalResults ?? 0
  const nextDisabled =
    total <= (feed ? feed.length : 0) + (page - 1) * DEFAULT_PAGE_SIZE

  return (
    <section className="news-feed">
      {error && <p>There has been an error...</p>}
      {isLoading ? (
        <p>Loading News Articles....</p>
      ) : (
        <>
          <ButtonGroup
            page={page}
            setPage={setPage}
            category={category}
            setCategory={setCategory}
            country={country}
            setCountry={setCountry}
            nextDisabled={nextDisabled}
            refetch={refetch}
          />
          <ul className="news-feed-list">{feed}</ul>
        </>
      )}
    </section>
  )
}
  //comment to flag file for code review
export default NewsFeed
