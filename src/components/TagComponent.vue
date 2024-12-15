<template>
  <div class="tag-container">
    <span class="iconfont icon icon-link"></span>
    <p>{{props.name}}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String
})
</script>

<style lang="scss" scoped>
.tag-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  &:hover{
    .icon,p {
      color: var(--primary-func-color);
    }
  }

  .icon {
    color: var(--tertiary-font-color);
    font-size: 0.83rem;
    transition: all .2s;
  }
  p {
    color: var(--secondary-font-color);
    font-size: 0.83rem;
    transition: all .2s;
    text-overflow: ellipsis;
    font-style: italic;
  }
}
</style>
