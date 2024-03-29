<template>
  <div class="blogSelected">
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__left">
            <nuxt-link :to="localePath('index')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 4" aria-hidden="true" style="width: 16px; transform: rotate(180deg);">
                  <polygon fill="currentColor" points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"/>
              </svg>
            </nuxt-link>
          </div>
          <div class="elevate-cover__left">
            <span class="blogSelected-year"><a href="https://earth.engineering/">{{ author }}</a> – {{ year }}</span>
            <br>
            
            <h1 class="elevate-cover__title">
              {{ title }}
            </h1>
            <p class="elevate-cover__description">{{ description }}</p>
            <br>
            <span v-if="trans">This post is also available in:</span> 
            <nuxt-link
            v-if="trans"
            v-for="(locale, i) in showLocales"
            :key="i"
            :to="`${locale.code == 'en' ? '' : '/' + locale.code}/post/${trans}`"
            >
              {{ locale.code == 'en' ? 'English' : (locale.code == 'es' ? 'Español' : (locale.code == 'cn' ? '中文' : '日本人')) }} <span v-if="i === 0 || i === 1" style="color: grey;"> – </span>
            </nuxt-link>
            <span v-else></span>
          </div>
        </div>
        <ImageResponsive
          :imageURL="'blog/' + id + '/_main.png'"
          v-if="!noMainImage"
          width="100%"
          class="elevate-cover__img"
          :alt="'Blog picture'" />
        <component
          v-else
          class="elevate-cover__img"
          :is="extraComponentLoader"
        />
      </div>
    </div>
    <div class="container small">
      <no-ssr>
        <DynamicMarkdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs"
          :extra-component="extraComponent" />
      </no-ssr>
    </div>
    <div style="text-align: center;">Consider <a :href="`https://twitter.com/intent/tweet?text=${title}&url=https://blog.earth.engineering/post/${id}&hashtags=#EARTH`">spreading the word</a> if you enjoyed this post!</div>
      <br>
      <br>
    <Subscribe/>
  </div>
</template>

<script lang="js">
  import DynamicMarkdown from "~/components/Markdown/DynamicMarkdown.vue"

  let langcode;

  export default {
  
    async asyncData ({params, app}) {
      const fileContent = await import(`~/contents/${app.i18n.locale}/blog/${params.slug}.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        trans: attr.trans,
        year: attr.year,
        author: attr.author,
        id: attr.id,
        owner: attr.owner,
        colors: attr.colors,
        role: attr.role,
        cardAlt: attr.cardAlt,
        noMainImage: attr.noMainImage,
        description: attr.description,
        related: attr.related,
        extraComponent: attr.extraComponent,
        renderFunc: fileContent.vue.render,
        staticRenderFuncs: fileContent.vue.staticRenderFns,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
    },

    nuxtI18n: {
      seo: false
    },

    components: { DynamicMarkdown},

    head () {
      return {
        title: this.pageTitle,
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "EARTH" },
          { name: "description", property: "og:description", content: this.description, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:image", content: 'https://blog.earth.engineering/meta_640.png' },
          { name: 'twitter:title', content: this.pageTitle },
          { name: "twitter:description", content: this.description },
          { name: 'twitter:site', content: '@earth_engineer' },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: "twitter:image", content: 'https://blog.earth.engineering/meta_640.png' }
        ],
        link: [
          this.hreflang
        ]
      };
    },

    transition: {
      name: 'slide-fade'
    },

    computed: {
      pageTitle () {
        return this.title + ' – EARTH';
      },
      showLocales () {
        return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
      },
      hreflang () {
        if (!this.trans) {
          return ''
        }
        
        if (this.showLocales[0].code === 'en'){
          langcode = ''
        } else if (this.showLocales[0].code === 'es'){
          langcode = '/es'
        } else if (this.showLocales[0].code === 'cn'){
          langcode = '/cn'
        } else if (this.showLocales[0].code === 'ja'){
          langcode = '/ja'
        }
        return {
          hid: 'alternate-hreflang-' + this.showLocales[0].iso,
          rel: 'alternate',
          href: `${process.env.baseUrl + langcode}/post/${this.trans}`,
          hreflang: this.showLocales[0].code
        }
      },
      

      extraComponentLoader () {
        if (!this.extraComponent) {
          return null
        }
        return () => import(`~/components/blog/${this.extraComponent}.vue`)
      }
    }
  }
</script>

<style lang="scss">
.overflowhidden {
  overflow: hidden;
}
.blogSelected-horizontalImage {
  height: 56rem;
  background-size: contain;
  transition: all ease .35s;
  opacity: 0;

  &[lazy='loading'] {
    filter: blur(15px);
    background-repeat: no-repeat!important;
    background-size: contain!important;
  }
  &[lazy='loaded'] {
    opacity: 1;
    background-repeat: no-repeat!important;
    background-size: contain!important;
  }
  .intro {
    display: flex;
  }
}
.elevate-cover {
  display: flex;
  flex-direction: column;
  min-height: 459px;

  @media (min-width: $screen-md){
    flex-direction: row;
  }

  &__img, &__textOffset {
    width: 100%;
  }

  &__left {
    max-width: 500px;
    width: 100%;
    padding: 2.4rem;
    margin-bottom: auto;

    @media (min-width: $screen-md){
      margin-left: auto;
      padding: 2.4rem 4rem 2.4rem 2.4rem;
    }
  }

  &__textOffset {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 3rem;
    font-family: 'Tiempos Headline', Arial, sans-serif;
    color: $secondary;

    @media (min-width: $screen-sm){
      font-size: 4rem;
    }
  }

  &__description {
    margin: 0;
    opacity: 0;
    animation: fadeinmove .5s ease;
    animation-delay: .5s;
    animation-fill-mode: forwards;
  }
}
.dynamicMarkdown {
  padding: 3.2rem 0;
  font-size: 16px;
  line-height: 1.7;
  color: $secondary;

  > *:not(.datagrid):not(.image-placeholder) {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  @media (min-width: $screen-sm){
    padding: 7.2rem 0;
    font-size: 19px;
  }

  h2 {
    padding-bottom: 3.2rem;
    padding-bottom: 2rem;

    @media (max-width: $screen-sm){
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2.2rem;
    padding-bottom: 2rem;
  }

  li {
    list-style-type: initial;
  }

  pre {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 2.4rem;
    border-radius: 4px;
    background-color: #f6f8fa;
    overflow-x: scroll;
    display: block;
    margin-bottom: 5rem;

    code {
      background-color: #f6f8fa;
    }
  }

  code {
    background: #f3f4f4;
    border-radius: 4px;
    display: inline;
    color: $secondary;
    font-size: 14px;
    padding: .2em .4em;

    @media (min-width: $screen-sm){
      font-size: 16px;
    }
  }
}
</style>
