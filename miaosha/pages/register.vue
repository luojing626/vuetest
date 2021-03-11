<template>
    <section class="container">

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                用户名：
                <el-input v-model="form.userName" placeholder="请输入用户名" class="input"></el-input>
            </el-form-item>
            <el-form-item>
                 设置密码：
                 <el-input placeholder="请输入密码" v-model="form.encrptParrword" show-password class="input"></el-input>
            </el-form-item>
             <el-form-item>
                 确认密码：
                 <el-input placeholder="请输入密码" v-model="form.encrptParrwordC" show-password class="input"></el-input>
            </el-form-item>
            <el-form-item>
                  年 龄：
                <el-input  placeholder="请输入年龄" v-if="form.age===0" class="input"></el-input>
                <el-input v-model="form.age" placeholder="请输入年龄" v-else class="input"></el-input>
            </el-form-item>
            <el-form-item>
                 性 别：
                <el-radio v-model="form.gender" label="1">男</el-radio>
                <el-radio v-model="form.gender" label="0">女</el-radio>
            </el-form-item>
            <el-form-item>
                手 机 号：<el-input v-model="form.telephone" placeholder="请输入手机号" class="input"></el-input>
                <el-button @click="sendOptCode">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                 验 证 码：
                <el-input v-model="form.optCode" placeholder="请输入验证码" class="input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="toPage">注册</el-button>
            </el-form-item>
        </el-form>


       
    </section>
</template>

<script>

import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'
import registerVue from './register.vue'

export default {
   components:{
    AppLogo,
    axios
   },
   data(){
       return{
           
            responseData:{},
            form:{
                userName:'',
                telephone:'',
                optCode:'',
                age:0,
                gender:"1",
                thirdpartid:0,
                registerMode:"",
                encrptParrword:"",
                encrptParrwordC:""
            }
       }
   },
   methods:{
       sendOptCode(){
           axios({
               method:'get',
               url:'http://localhost:8080/getOptCode',
                params:{
                    telephone:this.form.telephone
                }
           }).then(function(response){
               self.responseData = response.data
               if(self.responseData.status === "success"){
                   self.responseData.data = response.data
               }else{
                   alert(self.responseData.data.errMsg)
               }
           })
       },
       register(){
           if(this.form.encrptParrword === this.form.encrptParrwordC){
                   axios({
               method:"post",
               url:"http://localhost:8080/register",
               params:{
                   //传中文参数添加编码
                //    userName:encodeURIComponent(this.userName),
                   userName:this.form.userName,
                   gender:this.form.gender,
                   telephone:this.form.telephone,
                   optCode:this.form.optCode,
                   age:this.form.age,
                   thirdpartid:this.form.thirdpartid,
                   registerMode:this.form.registerMode,
                   encrptParrword:this.form.encrptParrword
               },
            //    xhrFields:{withCredentials:true}//session跨域解决
           }).then( function(response){
                self.responseData = response.data
               if(self.responseData.status === "success"){
                   alert(self.responseData.data.Msg)
                   return 1
               }else{
                   alert(self.responseData.data.errMsg)
               }
           })
           }else{
               alert("两次输入密码不一致,请重新输入")
           }
           
       },
       async toPage(){
           debugger
           const resRseult  = await this.register()
            if(resRseult === 1){
               this.$router.push("/login")
           }
       },
       
}
}


</script>


<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.input{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 70%;
    margin:5px;
}
    

</style>