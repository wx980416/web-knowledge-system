import HYDiscover from '@/pages/discover'
import HYFriend from '@/pages/friend'
import HYMine from '@/pages/mine'

const routes = [
  {
    path: '/',
    exact: true,
    component: HYDiscover,
  },
  {
    path: '/mine',
    exact: true,
    component: HYMine,
  },
  {
    path: '/friend',
    exact: true,
    component: HYFriend,
  },
]

export default routes
