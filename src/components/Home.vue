<template>
<!-- element-ui提供的Container 布局容器，必须先在element.js中注册这几个组件 -->
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <img src="../assets/img/heima.png" alt="">
      <h1>电商后台管理系统</h1>
      <el-button class="button" @click="logout">退出登陆</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <!-- active-text-color激活的文本的颜色 ；collapse-transition展开折叠时无动画-->
        <!-- router:是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <!-- default-active:=的值是当前激活菜单的 index，第一步给二级菜单绑定单击事件，点击链接时，把链接保存到sessionStorage中，刷新页面时把这个值取出来赋值给default-active -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <!-- item.id + ''是让item.id转换成字符串 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      // 保存被激活的链接地址
      activePath: '',
      // // 左侧菜单数据
      menulist: [],
      iconsObj: {
        // 每个菜单都有自己唯一的id，用这个当做key
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  // 生命周期函数，页面加载的时候要干啥
  created () {
    // 页面加载的时候就要获取所有的左侧菜单
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      // 清空sessionStorge
      window.sessionStorage.clear('token')
      // 重定向到登陆页
      this.$router.push('/login')
    },
    //  获取左侧菜单方法
    async getMenuList () {
      // const res = await this.axios.get('menus')
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      // 点击链接时，给activePath重新赋值
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.el-menu {
  border: 0;
}
i {
  margin-right: 10px;
}
.el-container {
  // 让他全屏
  height: 100%;
}
.el-header {
  background-color: #353c3e;
  text-align: center;
  line-height: 60px;
  height: 60px;
  padding-left: 0;
  img {
    float: left;
  }
  h1 {
    color: white;
    float: left;
    padding-left: 10px;
  }
  .button {
    float: right;
    margin-top: 10px;
  }
}

.el-aside {
  background-color: #303641;
}

.el-main {
  background-color: #e8ecef;
}
.toggle-button {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: white;
  text-align: center;
  // 让三条竖线之间有距离
  letter-spacing: 0.3em;
  cursor: pointer;
}
.toggle-button:hover {
  background-color: #262b34;
}
</style>
