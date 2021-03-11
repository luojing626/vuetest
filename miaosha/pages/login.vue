<template>
  <section class="container">

    <div>
      <div id="login">
        
        <div>
          <el-row>
          <el-col :span="12"><el-input v-model="telephone" ></el-input></el-col>
          <el-col :span="12"><el-button @click="sendOptCode">发送验证码</el-button></el-col>
          </el-row>
          </div>
          <div >
           <el-input v-model="optCode" ></el-input></div>
          <div>
          <el-row>
            <el-col :span="8"> <el-button @click="login">登录</el-button></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"> <el-button @click="register" >注册</el-button></el-col>
          </el-row>
         
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'
import registerVue from './register.vue'

export default {
  components: {
    AppLogo,
    axios
  },

  data(){
    return{
      telephone:'',
      optCode:'',
      responseData:{}
    }
   
    
  },
  mounted:{

  },
  methods:{
    async sendOptCode(){
        // let res = axios({
        //   method:'get',
        //   url:'http://localhost:8080/getOptCode?telephone='+this.telephone,
        // })
        // console.log("res",res)
        //
        // axios.get('http://localhost:8080/getOptCode',{
        //   params:{
        //     telephone:this.telephone
        //   }
        // })
        // .then(function (response){
        //   console.log(response.data)
        //   debugger
        //   this.responseData = response.data
        // })

        
        axios({
          method:'get',
          url:'http://localhost:8080/getOptCode',
          params:{
            telephone:this.telephone
          }
        })
        .then( function (response){
          self.responseData=response.data
           if(self.responseData.status === "success" ){
              self.optCode = self.responseData.data.optCode
            }else{
              alert(self.responseData.data.errMsg)
            }
        })
        
    
     
       
    },
    login(){

    },
    register(){
      this.$router.push("register")
    }
    
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
</style>

