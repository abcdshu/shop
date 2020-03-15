<template>
  <div class="signup-container">
      <div class="signup-box">
        <h2>注册</h2>
        <!-- 登陆表单区 ,需要在element.js中导入-->
        <!-- loginFormRef就是表单的实例对象-->
        <el-form  :model="SignupForm" :rules="loginFormRules" label-width="0px" class="signup_from">
          <!-- 请输入用户名 -->
          <el-form-item prop="username">
             <!-- prefix-icon是前置小图标 -->
             <el-input placeholder="请输入用户名" v-model="SignupForm.username" prefix-icon="iconfont icon-user">
             </el-input>
          </el-form-item>
          <!-- 注册手机号 -->
          <el-form :inline="true" class="yzm">
              <!--输入手机号 -->
              <el-form-item>
                <el-input v-model="SignupForm.phone" placeholder="手机号" prefix-icon="iconfont icon-3702mima"></el-input>
              </el-form-item>
              <!-- 发送验证码按钮 -->
              <el-form-item>
                <el-button type="warning" @click="onSubmit">发送验证码</el-button>
              </el-form-item>
          </el-form>
          <!-- 输入6位验证码 -->
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item  size="medium" >
                <el-input placeholder="6位验证码" v-model="input" :disabled="true" prefix-icon="iconfont icon-3702mima"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="SignupForm.password" prefix-icon="iconfont icon-3702mima" type="password">
            </el-input>
          </el-form-item>
          <!-- 再次输入密码 -->
          <el-form-item prop="password">
            <el-input placeholder="请再次输入密码" v-model="SignupForm.password" prefix-icon="iconfont icon-3702mima" type="password">
            </el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <el-form-item>
             <el-button type="warning" @click="toLogin" class="zc_btn">注册</el-button>
          </el-form-item>
          <!-- 已有账户？去登录 -->
          <div>
            <el-link type="warning" @click="toLogin">登录</el-link>
          </div>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      SignupForm: {
        username: '',
        password: '',
        phone: ''
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
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
    .signup-container{
        position: absolute;
        top: 40px;
        left: 50%;
        margin-left: -250px;
        padding: 40px;
        width: 440px;
        height: 540px;
        border: 1px solid #ccc;
        background-color: rgb(252, 252, 252);
    }

    .signup-box {
        width: 450px;
        height: 480px;
        position: absolute;
        left: 50%;
        top: 50%;
        // 位移
        transform: translate(-50%, -50%);
    }
    .signup_from {
        padding: 0 20px;
    }
    .yzm {
        display: flex;
        justify-content: space-between;
    }

    .zc_btn {
        width: 100%;
    }
</style>
