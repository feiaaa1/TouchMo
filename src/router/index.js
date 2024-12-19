import { createRouter, createWebHistory } from 'vue-router'
import { useStyleStateStore } from '@/stores/styleState';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView/SubViews/MoviePushView/MoviePushView.vue'),
        },
        {
          path: 'movies/:id',
          name: 'movieDetail',
          component: () => import('@/views/HomeView/SubViews/MovieDetailView/MovieDetailView.vue'),
        },
        {
          path: 'movies/:id/player',
          name: 'moviePlayer',
          component: () => import('@/views/HomeView/SubViews/MoviePlayerView/MoviePlayerView.vue'),
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('@/views/HomeView/SubViews/TagDisplayView/TagDisplayView.vue'),
        },
        {
          path: 'tags/:tagId',
          name: 'tagCorrelation',
          component: () => import('@/views/HomeView/SubViews/TagCorrelation/TagCorrelation.vue'),
        },
        {
          path: 'userFollowList',
          name: 'userFollowList',
          component: () =>
            import('@/views/HomeView/SubViews/UserFollowListView/UserFollowListView.vue'),
        },
        {
          path: 'userFavorites',
          name: 'userFavorites',
          component: () =>
            import('@/views/HomeView/SubViews/UserFavoritesView/UserFavoritesView.vue'),
        },
        {
          path: 'actors/:actorId',
          name: 'actors',
          component: () =>
            import('@/views/HomeView/SubViews/ActorProfileView/ActorProfileView.vue'),
        },
      ],
    },
    {
      path: '/*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView/NotFoundView.vue'),
    },
  ],
})

router.beforeResolve(async (to) => {
  if (to.name === 'movieDetail') {
    const styleStore = useStyleStateStore()
    styleStore.NavigationState.isMovieDetail = true
  }
})

router.afterEach((to, from) => {
    if (from.name === 'movieDetail') {
      const styleStore = useStyleStateStore()
      styleStore.NavigationState.isMovieDetail = false
    }
})

export default router
