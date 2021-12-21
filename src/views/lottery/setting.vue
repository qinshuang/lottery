<template>
  <div class="login-container">
    <el-form class="login-form" >
      <div class="title-container">
        <h3 class="title">设置</h3>
      </div>

      <el-button type="primary" icon="el-icon-edit" @click="add">新增</el-button>


      <el-table
        :key="randomKey"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="name" label="礼物名称"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button @click="del(scope.$index,scope.row)" type="text" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button @click="modify(scope.$index,scope.row)" type="text" size="mini" icon="el-icon-edit">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <br>

      <el-button :loading="loading" type="primary" @click="saveCache">提交</el-button>

    </el-form>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" label-width="80px">
        <el-form-item label="名称"  prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input-number v-model="dialogForm.count" label="数量"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'Setting',
    data() {
      return {
        tableData: [
        ],

        loading:false,
        randomKey:0,
        // 弹框隐藏
        dialogVisible: false,
        // 弹框标题
        dialogTitle: '',
        dialogForm:{
          index:null,
          count:0,
          name:''
        },
        dialogRules:{
          name:[
            { required: true, message: '名称不能为空', trigger: 'blur'},
          ],
          count:[
            { required: true, message: '数量不能为空', trigger: 'blur'},
            {pattern: /^[0-9]*$/, message: '数量需为数字', trigger: 'blur'}
          ]
        },

      }
    },
    methods:{
      saveCache(){
        this.$store.dispatch('lottery/initGiftCache',this.tableData);
        this.$router.push(`/lottery`)
      },
      add(){
        this.dialogTitle="新增"
        this.dialogVisible= true
        this.dialogForm={ index:null,count:0,name:''}
      },
      del(index,data){
        let that= this;
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.tableData.splice(index,1);
        });
      },
      modify(index,data){
        this.dialogVisible= true
        this.dialogTitle="修改"
        this.dialogForm={index:index,count:data.count,name:data.name}
      },
      dialogCancel(){
        this.dialogVisible= false
      },
      submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.dialogVisible= false;
              if (this.dialogForm.index==null) {
                this.tableData.push({
                  name: this.dialogForm.name,
                  count:this.dialogForm.count
                });
              }else{
                this.tableData[this.dialogForm.index]={
                  name: this.dialogForm.name,
                  count:this.dialogForm.count
                }
              }
              this.randomKey=Math.random();
            } else {
              this.$message({
                message: '输入错误',
                type: 'warning'
              });
              return false;
            }
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $cursor: #fff;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 1000px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>
