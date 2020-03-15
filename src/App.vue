<template>
  <div id="app">
    <!-- 路由占位符,
    通过路由匹配到的那些组件（router.js中的components里面的组件）都会被渲染到标签里面进行展示 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
