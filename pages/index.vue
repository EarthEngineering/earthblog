<template>
  <div class="page-index">
    <div class="container">
      <BlogSection :blogs="blogs"/>
      <br>
      <div style="text-align: center; font-size: 30px;">
      </div>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  import BlogSection from "~/components/Sections/BlogSection"

  import blogsEn from '~/contents/en/blogsEn.js'
  import blogsEs from '~/contents/es/blogsEs.js'
  import blogsCn from '~/contents/cn/blogsCn.js'

  export default {
    async asyncData ({app}) {

      let blogs;

      if (app.i18n.locale === 'en'){
        blogs = blogsEn
      } else if (app.i18n.locale === 'es'){
        blogs = blogsEs
      } else if (app.i18n.locale === 'cn'){
        blogs = blogsCn
      }
      
      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/${app.i18n.locale}/blog/${blogName}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogs.map(blog => asyncImport(blog)))
      .then((res) => {
        return {
          blogs: res
        }
      })
    },
    
    components: { BlogSection },

    transition: {
      name: 'slide-fade'
    },

    head () {
      return {
        title: 'EARTH | A new type of network for a new type of world',
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
      { name: 'twitter:title', content: 'EARTH Blog' },
      { name: 'twitter:description', content: 'A new type of network for a new type of world.'},
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@earth_engineer' },
      { name: 'twitter:image', content: 'https://blog.earth.engineering/meta_640.png' },
      { name: 'twitter:image:alt', content: 'EARTH logo' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@earth_engineer' },
      { name: 'og:title', content: 'EARTH Blog' },
      { name: 'og:description', content: 'A new type of network for a new type of world.' },
      { name: 'og:url', content: 'https://blog.earth.engineering' },
      { name: 'og:image', content: 'https://blog.earth.engineering/meta_640.png' },
        ]
      };
    },

    computed: {
      ogImage: function () {
        return;
      }
    }
  }
</script>
