
import { ReactComponent as amazon } from './amazon.svg'
import { ReactComponent as coursera } from './coursera.svg'
import { ReactComponent as cv } from './cv.svg'
import { ReactComponent as docs } from './docs.svg'
import { ReactComponent as email } from './email.svg'
import { ReactComponent as github } from './github.svg'
import { ReactComponent as link } from './link.svg'
import { ReactComponent as linkedin } from './linkedin.svg'
import { ReactComponent as pdf } from './pdf.svg'
import { ReactComponent as phone } from './phone.svg'
import { ReactComponent as play } from './play.svg'
import { ReactComponent as print } from './print.svg'
import { ReactComponent as skype } from './skype.svg'
import { ReactComponent as stackoverflow } from './stackoverflow.svg'

const icons: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  amazon,
  coursera,
  cv,
  docs,
  email,
  github,
  link,
  linkedin,
  pdf,
  phone,
  play,
  print,
  skype,
  stackoverflow,
}

const getIconForType = (type?: string) =>
  icons[type || 'link'] || link

export default getIconForType
