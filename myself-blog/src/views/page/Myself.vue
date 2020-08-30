<template>
    <div class="myself-container">
      <main class="page" id="pdfDom">
        <section>
          <h1 class="f-s-18 f-w-900 m-b-20">个人信息</h1>
          <div class="boxs-content">
            <img v-if="userInfo.username == 'devil'" src="@/assets/img/1.jpg" alt="" width="120px" height="170px">
            <div class="boxes default m-b-20" :class="{boxsW: userInfo.username == 'devil'}">
              <div class="box bg-gray-lightest p-t-0 p-b-0">
                <div class="row">
                  <div class="col-4 p-t-10 p-b-10">● 颜挺瑞 | 男 | 1994</div>
                  <div class="col-4 p-t-10 p-b-10 border">● 前端开发 | 3 年工作经验</div>
                  <div class="col-1 p-t-10 p-b-10 border">● 大专 | 哈尔滨铁道职业技术学院 | 工程系</div>
                </div>
                <div class="row">
                  <div class="col-4 p-t-10 p-b-10">● 期望职位：Web高级前端</div>
                  <div class="col-4 p-t-10 p-b-10 border">● 期望城市：杭州</div>
                </div>
              </div>
              <div class="box bg-gray-lightest">● Github：
                <a href="https://github.com/a309492165" target="_blank">https://github.com/a309492165</a>
              </div>
              <!-- <div class="box bg-gray-lightest">● Gitee：
                <a href="https://gitee.com/redspite" target="_blank">https://gitee.com/redspite
                </a>
              </div> -->
              <div class="box bg-gray-lightest">● 技术博客：
                <a href="http://www.timelysnow.cn/#/" target="_blank">http://www.timelysnow.cn/#/</a>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h1 class="f-s-18 f-w-900 m-b-20">联系方式</h1>
          <div class="boxes default m-b-20">
            <div class="box bg-gray-lightest p-t-0 p-b-0">
              <div class="row">
                <div class="col-4 p-t-10 p-b-10">● 手机：13071858818</div>
                <div class="col-4 p-t-10 p-b-10 border">● Email：309492165@qq.com</div>
                <div class="col-1 p-t-10 p-b-10 border">● 个人网站：http://www.timelysnow.cn/#/（一期）</div>
                <div class="col-1 p-t-10 p-b-10 border">● 地球网站：<a href="http://globe.timelysnow.cn" target="_blank">http://globe.timelysnow.cn</a></div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h1 class="f-s-18 f-w-900 m-b-20">开源项目</h1>
          <div class="boxes default m-b-20">
            <div class="box bg-gray-lightest">●<a href="http://121.196.56.243:8080" target="_blank"> 个人博客 - 使用 Vue + Vuex + pdf + Egg + JSencrypt 构建的个人网站，个人简历</a></div>
            <div class="box bg-gray-lightest">●<a href="https://github.com/a309492165/Eden/tree/master/wx" target="_blank"> 微信小程序思甜忆苦</a></div>
            <!-- <div class="box bg-gray-lightest">●<a href="https://github.com/Redspitee/Cv" target="_blank"> 早期博客 - 纯静态页面,百度SEO排名较靠前</a></div> -->
          </div>
        </section>
        <section>
          <h1 class="f-s-18 f-w-900 m-b-20">技能掌握</h1>
          <div class="boxes default m-b-20">
            <div class="box bg-gray-lightest">● 前端框架：Vue/JQuery/微信小程序</div>
            <div class="box bg-gray-lightest">● 前端工具：Webpack/Sass/Less</div>
            <div class="box bg-gray-lightest">● 后端框架：NodeJS/Koa/Egg</div>
            <div class="box bg-gray-lightest">● 数据库相关：MySQL</div>
            <div class="box bg-gray-lightest">● 版本管理工具：Git/GitLab/SVN</div>
          </div>
        </section>
        <section>
          <h1 class="f-s-18 f-w-900 m-b-20">工作经历</h1>
          <div class="boxes default m-b-20">
            <div class="box bg-gray-lightest">● 杭州皓易科技有限公司 （ 2019 年 01 月 ~ 至今 ）</div>
            <div class="box bg-gray-lightest">
              <p class="m-t-0"><b>主导能源局上报系统、协作O-Wind2.0改造</b></p>
              <p>- 前端技术选型、架构设计</p>
              <p>- 项目优化，代码精简，高度组件化、模块化</p>
              <p>- 解决问题：跨域请求、多系统协作</p>
              <p>- 涉及功能：vuex数据中心化处理、cesium地图api动态加载客户所需数据</p>
              <p>- 涉及功能：token、用户权限管理、全局状态与路由管理、表单验证、原生接口对接等</p>
              <p>- 能源局上报地址：<a href="http://ebrs.owind.com.cn/ebrs" target="_blank">http://ebrs.owind.com.cn/ebrs</a></p>
            </div>
            <div class="box bg-gray-lightest">
              <p class="m-t-0"><b>O-Wind系统定制与维护、能源局系统独立拆分开发</b></p>
              <p>- 前端系统维护及功能定制开发</p>
              <p>- 项目优化，代码精简，echarts图表可视化</p>
              <p>- 解决问题：各个风场现场不同分辨率超大拼接屏自适应展示</p>
              <p>- 涉及功能：高德地图、亿海蓝地图、cesium地图api动态加载客户所需数据</p>
              <p>- 涉及功能：token、用户权限管理、表单验证、原生接口对接等</p>
              <p>- O-Wind地址：<a href="http://www.owind.com.cn/" target="_blank">http://www.owind.com.cn/</a></p>
            </div>
          </div>
          <div class="boxes default m-b-20">
            <div class="box bg-gray-lightest">● 杭州格爱科技有限公司 （ 2018 年 3 月 ~ 2018 年 12 月 ）</div>
            <div class="box bg-gray-lightest">
              <p class="m-t-0"><b>官网页面更新与维护</b> </p>
              <p> - JQ + CSS3 + Bootstrap + Html5</p>
              <p>- 负责官网静态页开发及简单交互</p>
              <p>- 负责网站移动端、各浏览器适配网页适配</p>
              <p>- 负责对接后台数据动态交互</p>
            </div>
          </div>......
        </section>
      </main>
    </div>
</template>

<script>
import util from '@/utils/util'
export default {
  name: 'Myself',
  data() {
    return {
      userInfo: {}
    }
  },
  mounted () {
    let myself = sessionStorage.getItem('_mySelf')
    if (myself !== 'null' && myself !== undefined && myself !== null) {
      let userStr = util.encompile(myself)
      this.userInfo = JSON.parse(userStr)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: #3f1c1c;
  font-size: 14px;
}
.page .m-b-20 {
  margin-bottom: 20px !important;
}
.page .f-s-18 {
  font-size: 18px !important;
}
.page .f-w-900 {
  font-weight: 900 !important;
}
.page .boxes > .box:last-child {
  border-bottom-left-radius: 3px !important;
  border-bottom-right-radius: 3px !important;
}
.page .boxes > .box:first-child {
  border-top-left-radius: 3px !important;
  border-top-right-radius: 3px !important;
}
.page .boxes > .box {
  border-width: 0;
  border-radius: 0;
  margin-bottom: 0;
}
.page .boxes > .box:last-child {
  border-bottom: none;
}
.page .bg-gray-lightest {
  background-color: #F7F3EE;
}
.page .p-b-0 {
  padding-bottom: 0px !important;
}
.page .p-t-0 {
  padding-top: 0px !important;
}
.page .box {
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  background-color: #fff;
}
.page .row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}
.page .boxes {
  border: 2px solid transparent;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
}
.page .boxesW {
  width: calc(100% - 120px);
}
.page .boxes p {
  margin-top: 10px;
}
.page h1 {
  margin-left: -20px;
  padding-left: 15px;
  border-left: 5px solid #52D3F5;
  text-align: left;
  font-size: 14px;
}
.page .border {
  position: relative;
}
.page .border:before {
  content: '';
  position: absolute;
  top: 0;
  left: -2px;
  width: 2px;
  height: 100%;
}
.page .col,
.page .col-1,
.page .col-2,
.page .col-3,
.page .col-4,
.page .col-5,
.page .col-6,
.page .col-7,
.page .col-8,
.page .col-9,
.page .col-10,
.page .col-11,
.page .col-12 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}
.page section a {
  color: #666;
}
.page section a:hover {
  color: #333;
  text-decoration: underline;
}
.page .p-b-10 {
  padding-bottom: 10px !important;
}
.page .p-t-10 {
  padding-top: 10px !important;
}
.page .flex-p {
  display: flex;
  flex: 1;
}
.page p.flex-p span:first-child {
  color: #52D3F5;
  min-width: 5em;
}
.page .border {
  position: relative;
}
.page .bg-gray-lightest {
  background-color: #f5f5f5;
}
.boxs-content {
  display: flex;
}
@media (min-width: 576px) {
  .page .col-4 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 33.33333%;
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
}
</style>
