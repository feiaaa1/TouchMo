<template>
  <div class="shorteing-container" @click="navigateToMovieDetail(film.id)">
    <div class="img-container">
      <img :src="film.cover" alt="">
    </div>
    <div class="detail-container">
      <p>{{film.area}}</p>
      <h1>{{ '['+film.language+'] '+film.title }}</h1>
      <div class="tags-views-container">
        <div ref="tag-list" class="tags-container">
          <TagComponent  v-for="item in film.categories" :key="item.id" :name="item.name" /></div>
        <div class="views-container">
          <span class="icon icon-view iconfont"></span>
          <span>{{film.viewNum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue';
import TagComponent from './TagComponent.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const film = JSON.parse(JSON.stringify({
        "id": 13,
        "title": "好东西",
        "area": "中国大陆",
        "releaseTime": "2024-11-22",
        "viewNum": 0,
        "description": "爱逞强的单亲妈妈王铁梅（宋佳 饰）带小孩王茉莉（曾慕梅 饰）搬到新家，结识了所谓清醒恋爱脑的邻居小叶（钟楚曦 饰）。两位性格迥异的女性，一个坚强，一个柔软，一个擅长给人当妈，一个擅长随时撒谎。面对旧创伤和新挑战，她们彼此温暖互相慰藉。\n     而围绕王铁梅的两个男人，前夫（赵又廷 饰）不时“添乱”，女儿的鼓手老师（章宇 饰）似乎充满新的可能。作为已经觉醒的女人们和学习过性别议题的男人们，会遇到什么新问题？会如何看待自己和世界？",
        "cover": "https://p0.pipi.cn/mediaplus/friday_image_fe/cdf05c5c8b05c26b1b8014449d2ebb6ef8749.jpg?imageMogr2/quality/80",
        "duration": 123,
        "score": 0.0,
        "language": "国语",
        "directors": [
            {
                "id": 25,
                "name": "邵艺辉",
                "sex": null,
                "nation": null,
                "role": 0,
                "description": null,
                "avatar": "https://p0.pipi.cn/basicdata/25bfd6d7537e7a395bb86066b739b7e96c91f.jpg?imageMogr2/thumbnail/2500x2500%3E",
                "films": []
            }
        ],
        "actors": [
            {
                "id": 27,
                "name": "宋佳",
                "sex": null,
                "nation": null,
                "role": 1,
                "description": null,
                "avatar": "https://p0.pipi.cn/basicdata/25bfd6d7537e7acf3e281e0c814197326f5e3.jpg?imageMogr2/thumbnail/2500x2500%3E",
                "films": []
            },
            {
                "id": 29,
                "name": "钟楚曦",
                "sex": null,
                "nation": null,
                "role": 1,
                "description": null,
                "avatar": "https://p0.pipi.cn/basicdata/25bfd62f7a33388ea3c9fd640b52775cdc54d.png?imageMogr2/thumbnail/2500x2500%3E",
                "films": []
            },
            {
                "id": 31,
                "name": "章宇",
                "sex": null,
                "nation": null,
                "role": 1,
                "description": null,
                "avatar": "https://p0.pipi.cn/basicdata/25bfd6d"
    }],
"categories": [
    {
        "id": 1,
        "name": "悬疑"
    },
    {
        "id": 2,
        "name": "科幻"
    },
    {
        "id": 3,
        "name": "爱情"
    },
    {
        "id": 4,
        "name": "喜剧"
    },
    {
        "id": 5,
        "name": "动作"
    },
    {
        "id": 6,
        "name": "恐怖"
    },
    {
        "id": 7,
        "name": "历史"
    },
    {
        "id": 8,
        "name": "奇幻"
    },
    {
        "id": 9,
        "name": "冒险"
    },
    {
        "id": 10,
        "name": "纪录片"
    },
    {
        "id": 11,
        "name": "动画"
    }
]
}))
const tagList = useTemplateRef("tag-list")

function navigateToMovieDetail(id) {
  router.push({
    name: 'movieDetail',
    params: {id: id}
  })
}

function updateContainer() {
  const children = Array.from(tagList.value.children)
  let totalWidth = 0;
  let lastVisibleIndex = -1;
  children.forEach((child, index) => {
    const childWidth = child.offsetWidth;
    totalWidth += childWidth;

    if (totalWidth <= tagList.value.offsetWidth) {
      lastVisibleIndex = index
    }
  })
  children.slice(lastVisibleIndex-1).forEach(child => {
    child.classList.add('hidden')
  })
}

onMounted(() => {
  updateContainer()
})
</script>

<style lang="scss" scoped>
.shorteing-container {
  cursor: pointer;
  width: 100%;
  height: 17rem;
  background-color: var(--quatenary-bg-color);
  border: 1px solid var(--primary-border-color);
  overflow: hidden;
  border-radius: 0.7rem;
  transition: all .5s;
  display: flex;
  flex-direction: column;
  &:hover{
    border: 1px solid var(--primary-accent-color);

    .detail-container h1{
        color: var(--primary-accent-color);
      }

      .img-container img{
      transform: translate(-50%, -50%) scale(1.02);
      }

  }

  .img-container {
    flex-shrink: 0;
    width: 100%;
    height: 55%;
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: #2b2b2b50;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all .5s;
    }
  }

  .detail-container {
    height: 100%;
    width: 100%;
    padding: 1.5rem 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.3rem;

    p {
      color: var(--primary-font-color);
      font-size: 0.7rem;
      font-style: italic;
    }

    h1{
      color: var(--secondary-font-color);
      font-size: 1.2rem;
      transition: all .5s;
    }

    .tags-views-container{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tags-container{
        display: flex;
        gap: 0.7rem;
        width: 80%;
        overflow: hidden;

        .hidden {
          display: none !important;
        }


      }

      .views-container{
        color: var(--primary-font-color);

        .icon {
          margin-right: 5px;
        }
      }
    }
  }

}
</style>
