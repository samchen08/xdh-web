<template>
  <div class="login-page" @keyup.13="handleSubmit">
    <el-container class="login-page__wrapper">
      <el-main>
        <div class="login-page__logo"></div>
        <div class="login-page__name">东莞市指挥及情报应用门户</div>
        <div class="login-page__main">
          <el-form ref="form" class="login-page__form" inline :model="loginForm" :rules="rules">
            <el-form-item prop="account">
              <el-input placeholder="请输入用户名" tabindex="1" v-model="loginForm.account">
                <template slot="prepend"><i class="iconfont icon-user"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" type="password" tabindex="2" v-model="loginForm.password">
                <template slot="prepend"><i class="iconfont icon-lock"></i></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="handleSubmit">登录</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success">PKI证书</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
      <el-footer height="30px">
        <div>技术支持：珠海市新德汇信息技术有限公司 <a href="#">下载谷歌浏览器</a></div>
      </el-footer>
    </el-container>
  </div>

</template>

<style type="text/scss" lang="scss">
  @import "../style/vars";

  .login-page {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_line.jpg') #020d45 repeat-y center center;
    min-height: 600px;

    &__wrapper {
      width: 100%;
      height: 100%;
      background: url('../assets/images/login_bg.jpg') no-repeat center center;
      position: relative;
      text-align: center;
      background-size: auto;
      padding: 0;
    }
    &__logo {
      width: 300px;
      height: calc(100vh * 0.35);
      min-height: 200px;
      background: url('../assets/images/login_logo.png') no-repeat center center;
      margin: auto;
    }
    &__name {
      font-size: 34px;
      color: #fff;
      font-family: "Microsoft YaHei", Arial, sans-serif;
      text-shadow: 3px 3px 3px #333;
      margin-bottom: 30px;
      font-weight: bold;
      letter-spacing: 5px;
    }
    &__main {
      width: 740px;
      margin: auto;
    }
    &__info {
      text-align: left;
      margin-top: 10px;
    }
    .el-input {
      width: 250px;
    }
    .el-form {
      background: rgba(0, 0, 102, 0.6);
      padding-top: 20px;
      text-align: center;
      border-radius: 6px;
    }
    .el-form-item:last-child {
      margin-right: 0;
    }
    .el-input-group__prepend {
      padding: 0 10px;
      background: #39c;
      color: #fff;
      border: none;
    }
    .el-input__inner {
      font-size: 16px;
    }
    .el-input__inner:focus {
      background: $--color-primary-light-9;
    }
    .el-form-item.is-error {
      .el-input__inner {
        background: $--color-danger-light;
      }
    }
    .el-main {
      padding: 0;
    }
    .el-footer {
      color: #ccc;
      background: rgba(0, 0, 102, 0.3);;
      line-height: 30px;
    }
  }
</style>

<script>
  export default {
    data () {
      return {
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ]
        },
        loginForm: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$message({
              message: '提交表单',
              type: 'success'
            })
          }
        })
      }
    }
  }
</script>
