<template>
  <div class="detail-container">
    <header>
      <img :src="film.cover" alt="" />
      <h1>{{ '【' + film.language + '】' + film.title }}</h1>
    </header>
    <main>
      <div class="left-container">
        <h1>电影介绍</h1>
        <p>{{ film.description }}</p>
        <h1>电影海报</h1>
        <img :src="film.cover" alt="" />
        <h1>电影资源</h1>
        <button class="source-btn">点我获取</button>
      </div>
      <div class="right-container"></div>
    </main>
  </div>
</template>

<script setup>
const film = JSON.parse(
  JSON.stringify({
    id: 13,
    title: '好东西',
    area: '中国大陆',
    releaseTime: '2024-11-22',
    viewNum: 0,
    description:
      '爱逞强的单亲妈妈王铁梅（宋佳 饰）带小孩王茉莉（曾慕梅 饰）搬到新家，结识了所谓清醒恋爱脑的邻居小叶（钟楚曦 饰）。两位性格迥异的女性，一个坚强，一个柔软，一个擅长给人当妈，一个擅长随时撒谎。面对旧创伤和新挑战，她们彼此温暖互相慰藉。\n     而围绕王铁梅的两个男人，前夫（赵又廷 饰）不时“添乱”，女儿的鼓手老师（章宇 饰）似乎充满新的可能。作为已经觉醒的女人们和学习过性别议题的男人们，会遇到什么新问题？会如何看待自己和世界？',
    cover:
      'https://p0.pipi.cn/mediaplus/friday_image_fe/cdf05c5c8b05c26b1b8014449d2ebb6ef8749.jpg?imageMogr2/quality/80',
    duration: 123,
    score: 0.0,
    language: '国语',
    directors: [
      {
        id: 25,
        name: '邵艺辉',
        sex: null,
        nation: null,
        role: 0,
        description: null,
        avatar:
          'https://p0.pipi.cn/basicdata/25bfd6d7537e7a395bb86066b739b7e96c91f.jpg?imageMogr2/thumbnail/2500x2500%3E',
        films: [],
      },
    ],
    actors: [
      {
        id: 27,
        name: '宋佳',
        sex: null,
        nation: null,
        role: 1,
        description: null,
        avatar:
          'https://p0.pipi.cn/basicdata/25bfd6d7537e7acf3e281e0c814197326f5e3.jpg?imageMogr2/thumbnail/2500x2500%3E',
        films: [],
      },
      {
        id: 29,
        name: '钟楚曦',
        sex: null,
        nation: null,
        role: 1,
        description: null,
        avatar:
          'https://p0.pipi.cn/basicdata/25bfd62f7a33388ea3c9fd640b52775cdc54d.png?imageMogr2/thumbnail/2500x2500%3E',
        films: [],
      },
      {
        id: 31,
        name: '章宇',
        sex: null,
        nation: null,
        role: 1,
        description: null,
        avatar: 'https://p0.pipi.cn/basicdata/25bfd6d',
      },
    ],
    categories: [
      {
        id: 1,
        name: '悬疑',
      },
      {
        id: 2,
        name: '科幻',
      },
      {
        id: 3,
        name: '爱情',
      },
      {
        id: 4,
        name: '喜剧',
      },
      {
        id: 5,
        name: '动作',
      },
      {
        id: 6,
        name: '恐怖',
      },
      {
        id: 7,
        name: '历史',
      },
      {
        id: 8,
        name: '奇幻',
      },
      {
        id: 9,
        name: '冒险',
      },
      {
        id: 10,
        name: '纪录片',
      },
      {
        id: 11,
        name: '动画',
      },
    ],
  }),
)
</script>

<style lang="scss" scoped>
.detail-container {
  header {
    position: relative;
    width: 100%;
    height: 20rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 20px 0px 0px 5rem;

    img {
      width: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(100px);
    }

    h1 {
      color: var(--secondary-font-color);
      font-size: 3rem;
    }
  }

  main {
    width: 100%;
    padding: 2rem;
    display: flex;
    gap: 1rem;

    .left-container {
      width: 75%;
      flex-shrink: 0;
      font-size: 0.8rem;
      color: var(--secondary-font-color);
      border-radius: 0.8rem;
      padding: 2.3rem;
      border: 1px solid var(--primary-border-color);
      background-color: var(--tertiary-bg-color);

      h1 {
        margin-bottom: 0.8rem;
        margin-top: 2rem;
      }

      p {
        color: var(--primary-font-color);
        width: 50%;
        font-size: 1rem;
        line-height: 2rem;
      }

      img {
        border-radius: 0.9rem;
      }

      .source-btn {
        cursor: pointer;
        color: var(--tertiary-bg-color);
        font-size: 1.8rem;
        border-radius: 100rem;
        background-color: var(--primary-font-color);
        width: 12rem;
        height: 4rem;
      }
    }

    .right-container {
      position: sticky;
      top: 5rem;
      width: 100%;
      border: 1px solid var(--primary-border-color);
      border-radius: 0.8rem;
      height: 30rem;
      background-color: var(--tertiary-bg-color);
    }
  }
}
</style>
