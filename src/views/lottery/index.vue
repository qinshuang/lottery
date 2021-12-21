<template>
  <el-container class="my-container">
    <el-main style="padding:40px;">
      <el-row :gutter="24">
        <el-col :span="6" v-for="(item,index) in randomGifts.slice(0, 8)" class="package-col">
          <div class="package-item">
            <div class="package-body shake shake-rotate" @click="open(index,item)">
              <img  src="../../assets/images/close.png" heigh="500px" width="300px" alt=""/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>

  import 'csshake';

export default {
  name: 'Lottery',
  data(){
    return {
      randomGifts:[],
    }
  },
  mounted(){
    this.randomList();
  },
  methods:{
    randomList(){
      // 初始化列表
      let gifts=this.$store.getters.giftCache,
        temp=[];
      gifts.forEach((item)=>{
        for (let i=0;i<item.count;i++){
          temp.push(item.name);
        }
      });
      this.randomGifts = this.shuffleArray(temp);
    },
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    open(index,data){
      this.$message('恭喜获得'+data);
      this.randomGifts.splice(index,1);
    }
  }
}
</script>

<style lang="scss" scoped>
  /*html,body,#app {*/
    /*height: 100%;*/
  /*}*/
  .my-container{
    height: 100%;
    background: url("../../assets/background.jpg") bottom center no-repeat #efeff4;
    background-size: 100% 100%;
  }
  .package-col{
    min-height: 520px;
    min-width: 350px;
  }
  .package-item{
    text-align: center;
  }
  .package-body img{
    border: #f6dea2  4px solid;
    box-shadow: 7px 7px 20px 0px #ffffff;
  }

</style>
