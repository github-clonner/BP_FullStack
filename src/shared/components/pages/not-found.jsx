// @flow

import React from 'react'
import Helmet from 'react-helmet'

const title = 'Page Not Found'

const NotFoundPage = () =>
  <div id="not-found">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: '404' },
        { property: 'og:title', content: title },
      ]}
    />
    <div className="container">
      <div className="row">
        <div className="jumbotron">
          <br />
          <br />
          <br />
          <h1>Oops! Couldn&apos;t find that page for you!</h1>
        </div>
      </div>
    </div>
  </div>

export default NotFoundPage
