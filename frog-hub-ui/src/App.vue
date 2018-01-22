<template>
  <div id="app">
    <el-container>
      <el-header class="title-bar" height="48px">
        <img src="./assets/frog.jpeg" class="logo">
        <a >Frog Hub UI</a>
        <el-select class="title-selector" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in titleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-header>
      <el-container>
        <el-aside class="aside-shadow" width="20%">
          
        </el-aside>
        <el-main>
          main
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      titleOptions: [
        {
          value: "Service1",
          label: "Service 1"
        },
        {
          value: "Service2",
          label: "Service 2"
        }
      ]
    };
  }
};
</script>

<style>
body {
  margin: 0;
}


.title-bar {
  background-color: #f4f4f4;
  border-bottom: 1px solid #6ea9b0;
}
.title-bar .logo {
  width: 40px;
  margin-left: 5%;
}
.title-bar a{
  height: 32px;
  display: inline-block;
  margin-top: -15px;
  margin-left: 10px;
  vertical-align: middle;
  font-weight: 600;
}
.title-bar .title-selector{
  top:-12px;
}
.title-bar .title-selector .el-input__inner{
  height: 32px;
}
.el-select-dropdown__item{
  height: 32px;
}
.el-aside{
  min-height: 800px;
}
.aside-shadow{
  box-shadow: 1px 0px 5px #6ea9b0 ;
}
</style>
