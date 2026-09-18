import Centralized from '../Centralized'

import { CircleUrl, FullUrl, LinkPreview, Url } from '.'

export default { title: 'Link' }

export const PlainUrl = () => (
  <Centralized>
    <Url
      link={{
        alias: 'bar',
        name: 'FOO',
        url: 'bar',
      }}
    />
  </Centralized>
)

export const FullUrlWithType = () => (
  <Centralized>
    <FullUrl
      style={{
        color: 'red',
      }}
      link={{
        alias: 'bar',
        name: 'FOO',
        url: 'https://amazon.com/dp/123',
      }}
    />
  </Centralized>
)

export const CircleUrlWithType = () => (
  <Centralized>
    <CircleUrl
      link={{
        alias: 'bar',
        name: 'FOO',
        url: 'https://amazon.com/dp/123',
      }}
    />
  </Centralized>
)

export const CircleUrlWithoutType = () => (
  <Centralized>
    <CircleUrl
      link={{
        alias: 'bar',
        name: 'FOO',
        url: 'bar',
      }}
    />
  </Centralized>
)

export const Preview = () => (
  <LinkPreview
    link={{
      alias: 'sample',
      name: 'name',
      url: 'foobar-zoo-loo',
    }}
  />
)
