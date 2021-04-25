import routes from './routes'
import strings from './strings';
import images from '../images/images'

const sections = [{
  title: strings.messageHeader,
  image: images.message,
  linkTo: routes.message,
  active: true
}, {
  title: strings.kidsHeader,
  image: images.kids,
  linkTo: routes.kids,
  active: true
}, {
  title: strings.christmasHeader,
  image: images.gift,
  linkTo: routes.christmas,
}, {
  title: "The Marriage Course",
  image: images.marriage,
  linkTo: routes.marriage,
}, {
  title: strings.prayerHeader,
  image: images.prayer,
  linkTo: routes.prayer,
  active: true
}, {
  title: strings.givingHeader,
  image: images.giving,
  linkTo: routes.giving,
  active: true
}, {
  title: "CIT Toy Drive 2021",
  image: images.toy,
  linkTo: routes.toy,
  active: true
}, {
  title: strings.connectHeader,
  image: images.connect,
  linkTo: routes.connect,
  active: true
}, {
  title: strings.groupsHeader,
  image: images.groups,
  linkTo: 'https://churchintoronto.churchcenter.com/groups/community-groups',
  external: true,
  active: true
}, {
  title: strings.newsHeader,
  image: images.upcomingEvents,
  linkTo: routes.news,
}, {
  title: strings.nextHeader,
  image: images.nextSteps,
  linkTo: routes.next,
}, {
  title: strings.alphaHeader,
  image: images.alpha,
  linkTo: routes.alpha,
}, {
  title: strings.volunteerHome,
  image: images.volunteer,
  linkTo: routes.volunteer,
}]

export default sections;