<template>
  <footer>
    <div class="footer__info">
      <div class="container footer__info-container">
        <div class="footer__copyright"> 
        <a style="color: white;" href="https://earth.engineering/" target="_blank">🌍🌏🌎</a>
        </div>
        <div style="color: white; text-align: center;">
        <a id="linkf" style="color: white; font-weight: bold;" href="https://earth.engineering/" target="_blank">&copy; {{ new Date().getFullYear() }} EARTH</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">

.footer {
	&__info {
		background-color: rgb(2, 138, 86);
		padding: 1.5em 0;
  }
  
  &__info-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;

    @media (min-width: $screen-sm){
      flex-direction: row;
    }
  }

	&__copyright {
    text-align: center;
    color: white;
		@media (min-width: $screen-sm) {
			text-align: inherit;
		}
	}

	&__top-page {
		color: $text-negative;
		display: block;
		text-align: center;
		line-height: 1;
		-webkit-transition: 1s;
		-moz-transition: 1s;
    transition: 1s;
    
		@media (min-width: $screen-sm){
			text-align: right;
		}
	}
}
</style>

