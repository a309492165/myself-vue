<template>
  <div class="layout-container">
    <a
      class="forkme"
      style="position:fixed;z-index:999;top:0;right:0"
      href="https://github.com/a309492165"
    >
      <img
        width="149"
        height="149"
        src="@/assets/img/forkme_right_orange_ff7600.png"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
    <div class="Header">
      <div class="header-box fadein">
        <img src="@/assets/img/author.jpg" alt="我的头像" />
      </div>
      <div>
        <p class="my-id">TimelySnow</p>
      </div>
      <div class="my-sort">
        <router-link to="/">简历</router-link>
        <router-link to="/look">点滴</router-link>
        <router-link to="/message">留言</router-link>
      </div>
    </div>
    <router-view></router-view>
    <el-button
      v-if="routeName == '/'"
      class="download"
      type="danger"
      @click="toGetPdf"
      >下载PDF</el-button
    >
    <div :class="['Gotop', { active: isShowTop }]" @click="handleScrollTotop">
      <div class="go-top-inner">
        <svg
          t="1565238236954"
          fill="currentColor"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3644"
          width="200"
          height="200"
        >
          <path
            d="M483.875 230.75a28.125 28.125 0 0 1 56.25 0v590.625a28.125 28.125 0 0 1-56.25 0z"
            p-id="3645"
          ></path>
          <path
            d="M512 242.28125l-205.03125 205.3125a28.125 28.125 0 1 1-39.9375-39.9375l225-225a28.125 28.125 0 0 1 39.9375 0l225 225a28.125 28.125 0 0 1-39.9375 39.9375z"
            p-id="3646"
          ></path>
        </svg>
      </div>
    </div>
    <div>
      <p class="beian">© TimelySnow</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
      title: 'web前端工程师-颜挺瑞',
      isShowTop: false
    }
  },
  computed: {
    ...mapState({
      routeName: state => state.routeName
    })
  },
  created() {
    this.listenFun()
  },
  methods: {
    toGetPdf() {
      window.scrollTo(0, 0)
      const loading = this.$loading({
        lock: true,
        text: '简历下载中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.getPdf(this.title, '#pdfDom', loading)
    },
    listenFun() {
      document.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 600) {
        this.isShowTop = true
      } else {
        this.isShowTop = false
      }
    },
    handleScrollTotop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  max-width: 800px;
  margin: 0.5rem auto 0;
}
.Header {
  width: 100%;
  text-align: center;
}
.Header .header-box {
  -webkit-animation: fadein 0.3s;
  animation: fadein 0.3s;
}
.Header .header-box img {
  width: 40vw;
  height: 40vw;
  max-width: 120px;
  max-height: 120px;
  border-radius: 50%;
}
.Header .my-id {
  font-size: 1.3em;
  font-weight: 500;
  padding: 0 0.5em;
  letter-spacing: 0.1em;
  line-height: 2em;
  margin: 2em 0;
  display: inline-block;
  color: #948c76;
  background: #fdf4e8;
}
.Header .my-sort {
  margin-bottom: 2em;
}
.Header .my-sort a {
  display: inline-block;
  margin: 0 1em;
  font-size: 0.8em;
  color: #948c76;
}
.Header .my-sort a:active,
.Header .my-sort a:hover {
  color: #948c76;
  text-decoration: underline;
}
.Header .my-sort a.router-link-exact-active {
  text-decoration: underline;
}
.download {
  z-index: 99;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  right: 10%;
  bottom: 20%;
  cursor: pointer;
}
.beian {
  text-align: center;
  width: 100%;
  font-size: 0.8em;
  line-height: 3em;
}
.Gotop {
  right: 3%;
  bottom: 6%;
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 50%;
  position: fixed;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  z-index: 1000;
  opacity: 0;
  display: none;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  color: #787978;
}
.Gotop .go-top-inner {
  width: 100%;
  height: 100%;
  position: relative;
}
.Gotop img,
.Gotop svg {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.Gotop.active {
  display: block;
  opacity: 1;
  animation: fadeTo 0.7s forwards;
}
</style>
