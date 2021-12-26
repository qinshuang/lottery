<template>
  <el-container class="my-container">
    <el-main>
      <el-row :gutter="24">
        <el-col :span="6" v-for="(item,index) in randomGifts.slice(0, 8)" class="package-col">
          <div class="package-item">
            <div class="package-body" @click="open(index,item)">
              <img src="../../assets/images/guaguapackage3.png" alt=""/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog id="guaguaDialog"
               :visible.sync="guagualeVisible"
               :close-on-click-modal="false"
               width="500px"
               :destroy-on-close="true">
      <div class="guagua-background">
        <div class="guagua-body"></div>
        <scratch-card
          elementId="scratch"
          width="280px"
          height="192px"
          :moveRadius="30"
          :ratio="0.1"
          :startCallback="startCallback"
          :clearCallback="clearCallbackUp"
          :coverImg="coverImg"
          :result="reLoadGuaguaResult"
        >
        </scratch-card>
      </div>
    </el-dialog>
  </el-container>

</template>

<script>

  import 'csshake'
  import scratchCard from 'lzy-scratch-card';

  export default {
    components:{
      "scratch-card":scratchCard,
    },
    name: 'Lottery',
    data() {
      return {
        coverImg:require('../../assets/images/guagua.png'),
        randomGifts: [],
        guagualeVisible: false,
        giftName:'',
        giftIndex:-1,
      }
    },
    computed:{
      reLoadGuaguaResult(){
        return '<p class="guagua-result" ><span>'+
          this.giftName +'<span></p>';
      }
    },
    mounted() {
      this.randomList()
    },
    methods: {
      randomList() {
        // 初始化列表
        let gifts = this.$store.getters.giftCache,
          temp = []
        gifts.forEach((item) => {
          for (let i = 0; i < item.count; i++) {
            temp.push(item.name)
          }
        })
        this.randomGifts = this.shuffleArray(temp)
      },
      shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1))
          var temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
        return array
      },
      open(index, data) {
        this.guagualeVisible = true
        this.giftName = data
        this.giftIndex = index
      },
      userGetGift(index) {
        this.randomGifts.splice(index, 1)
      },
      startCallback(){

      },
      clearCallbackUp(){
        this.userGetGift(this.giftIndex);
      }
    }
  }
</script>

<style lang="scss">
  /*html,body,#app {*/
  /*height: 100%;*/
  /*}*/
  .my-container {
    height: 100%;
    background: url("../../assets/images/background.png") bottom center no-repeat #efeff4;
    background-size: 100% 100%;
  }

  .package-col {
    /*min-height: 520px;*/
    min-width: 350px;
  }

  .package-item {
    text-align: center;
  }

  .package-body img {
    border: #ec4e5d 1px solid;
    box-shadow: 7px 7px 20px 0px #ffffff;
    height: 440px;
    width: 300px;
    background: #CC0033;
  }

  #guaguaDialog {
    .el-dialog{
      background-color: rgb(253 255 255 / 0%);
    }

    .el-dialog__body {
      padding: 0;
    }

    .guagua-background {
      padding-left: 121px;
      padding-top: 260px;
      height: 500px;
      width: 500px;
      background: url("../../assets/images/guaguapackage.png") bottom center no-repeat;
      background-size: 100% 100%;
    }

    .guagua-body {
      position: absolute;
      z-index: -1;
      height: 192px;
      width: 273px;
      background: url("../../assets/images/guagua.png") bottom center no-repeat #efeff4;
      background-size: 100% 100%;
    }


    .guagua-result{
      height:100%;
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      color:red;
      font-size:50px;
      text-align:center;
      background:#e7e7e7;
      border-radius:12px;
    }

    .el-dialog__close.el-icon-close{
      font-size: xx-large;
      color: #f9f050;
      &::before{
        content: "\e78d";
      }
    }
  }



</style>
