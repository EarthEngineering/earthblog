<template>
  <section>
    <div class="blogs__top">
      <div>
        <!-- <h2>{{ $t('posts') }}</h2> -->
        <a href="https://blog.earth.engineering/">
        <div style="font-size: 42px; font-family: Ubuntu; color: #222; font-weight: 700; line-height: 1.2em;">EARTH</div>
        </a>
      </div>
    </div>
    <br>
    <br>
    <ul class="blogs">
      <blog-card
        v-for="(blog, index) in blogs.slice().reverse()"
        :key="index"
        :blog="blog" />
    </ul>
  </section>
</template>
<script>
import BlogCard from "~/components/BlogCard.vue";

export default {
  components: { BlogCard },
  props: {
    blogs: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
.blogs {
  margin: 0;
  
  @media (min-width: $screen-sm){
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    display: grid;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 4rem;
  }
}
</style>

