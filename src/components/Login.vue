//  每一个组件都由三部分组成：结构、样式、行为
//  结构
<template>
  <!-- 表单的数据全都绑定在form对象中 -->
  <div class="login_container">
    <div class="login_box">
      <!-- 登录组件顶部的头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登陆表单区 ,需要在element.js中导入-->
      <!-- ref 引用 ，loginFormRef就是表单的实例对象，这个对象通过调用resetFields对表单进行重置-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
           <!-- prefix-icon是前置小图标 -->
           <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
           <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
           <el-button type="primary" @click="login">登陆</el-button>
           <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
        <el-link type="warning" @click="signup">注册</el-link>
      </el-form>
    </div>
  </div>
</template>

//  行为
<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则(验证是否合法)对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          // 必选项
          // 最小长度3,最大长度5，当光标失去焦点时触发。trigger:触发规则
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登陆表单
    resetLoginForm () {
      // 这个this就指向login.vue的实例对象
      // 可以看到这个实例对象中，通过$refs方式可以直接获取到属性loginFormRef，也就是el-form这个组件的实例
      // console.log(this)
      // 调用resetFields方法重置整个表单
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid),valid是布尔值，验证输入的内容格式是否正确
        if (!valid) return
        // 通过$http发起一个post请求，请求地址为login,请求的参数为一个对象，
        // 但是data中已经有了表单的数据绑定对象，所以可以直接用
        // 如果要请求这个服务器，必须要保证这个服务器处于运行中的状态
        // 定义一个result来接收返回的结果，结果是promise
        // 如果某个操作的返回值是promise,就可以用async,await来简化操作
        // const result = await this.$http.post('login', this.loginForm)
        // console.log(result)// 里面的data属性才是我们需要的，所以直接解构
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1.登录成功之后，需要将后台返回的token保存到客户端的sessionStorage中（lacalStorage是持久化的存储机制，sessionStorage是会话期间的存储机制,token只在网站打开期间生效，所以选择sessionStorage）
        //   1.1 保存token的原因：项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应该在当前网站打开期间生效，所以将token保存在 sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        //   // 2.通过编程式导航(通过$router对象调用push方法就能够发生跳转)跳转到后台主页，路由地址是/home
        this.$router.push('/home')
      })
    },
    signup () {
      this.$router.push('/signup')
    }
  }
}
</script>

//  样式，支持less语法格式
//  scoped是一个vue指令，用来控制组件的样式生效区间：下面的样式只在当前组件内生效，如果没有就是全局生效，所以一般都加，防止组件之间的样式冲突
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 320px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    // 位移
    transform: translate(-50%, -50%);
  }

  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    // less嵌套
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px 20px;
    // 默认from表单的box-sizing是content-box,
    // content-box  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
    // border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。
    box-sizing: border-box;
  }

  .btns {
    // 变成弹性布局
    display: flex;
    // 元素在主轴（页面）上由右或者下开始排列
    justify-content: flex-end;
  }
</style>
