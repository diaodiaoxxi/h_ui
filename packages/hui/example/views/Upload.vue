<template>
  <div>
    <h1>文件上传</h1>
    <h2>基本用法 自动上传 单选</h2>
    <h-upload action="//jsonplaceholder.typicode.com/posts/" :on-remove="handleRemove" :beforeRemove="handleBeforeRemove">
      <h-button type="ghost" icon="activity">上传文件</h-button>
    </h-upload>
    <h2>多选</h2>
    <h-upload multiple action="//jsonplaceholder.typicode.com/posts/" :on-remove="handleRemove" :beforeRemove="handleBeforeRemove">
      <h-button type="ghost" icon="activity">上传文件</h-button>
    </h-upload>
    <h2>手动上传</h2>
    <h-upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/" :on-remove="handleRemove" :beforeRemove="handleBeforeRemove">
      <h-button type="ghost" icon="activity">上传文件</h-button>
    </h-upload>
    <div v-if="file !== null">待上传文件：{{ file.name }} <h-button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</h-button>
    </div>
    <h2>拖拽上传</h2>
    <h-upload
      multiple
      type="drag"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-remove="handleRemove"
      :beforeRemove="handleBeforeRemove">
      <div style="padding: 20px 0">
        <h-Icon name="activity" size="52" style="color: #3399ff"></h-Icon>
        <p>点击或将文件拖拽到这里上传</p>
      </div>
    </h-upload>
    <h2>自定义上传列表</h2>
    <div>
     <h-upload
            :before-upload="handleUpload"
            action="//jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemove"
            :beforeRemove="handleBeforeRemove">
            <h-button type="ghost" icon="ios-cloud-upload-outline">选择要上传文件的文件</h-button>
      </h-upload>
      <div v-if="file !== null">待上传文件：{{ file.name }} <h-button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</h-button></div>
      </div>
    <h2>手动上传列表（单个文件）</h2>
    <p>
      配置selfConfig属性，同时配置手动上传对应的按钮，其中slot="chooseFile"表示选择上传文件， slot="postFile"表示开始上传，slot="cancleFile"表示取消全部未上传成功的文件，slot="showList"表示已上传列表，这些slot可以按需配置
    </p>
    <p>
      如需多选上传，请配置multiple属性
    </p>
    <div>
    <h-upload
      action="//jsonplaceholder.typicode.com/posts/"
      :on-remove="handleRemove"
      :beforeRemove="handleBeforeRemove"
      selfConfig>
      <h-button type="ghost" icon="ios-cloud-upload-outline" slot="chooseFile">选择要上传文件的文件</h-button>
      <h-button type="ghost" icon="ios-cloud-upload-outline" slot="postFile">开始上传</h-button>
      <h-button type="ghost" icon="ios-cloud-upload-outline" slot="cancleFile">取消</h-button>
      <h-button type="ghost" icon="ios-cloud-upload-outline" slot="showList" ref="showList">已上传列表
      </h-button>
    </h-upload>
    <h2>开启mergeHook</h2>
    <h-upload :format="['txt', 'jpeg', 'vue']" action="//jsonplaceholder.typicode.com/posts/" 
              :on-self-success="handleSuccess"
              :before-upload="handleBeforeUpload" :on-format-error="handleFormatError"
              :max-size="210" :on-exceeded-size="handleMaxSize" multiple uploadAll mergeHook>
      <h-button type="primary" icon="ios-cloud-upload-outline" class="mg-b-5">上传文件</h-button>
    </h-upload>
    </div>
  </div>
</template>

<script>

export default {
  name: 'waves',
  data() {
    return {
      file: null,
      loadingStatus: false
    }
  },
  methods: {
    handleSuccess(file, filelist) {
      console.log("=====================")
      console.log("上传成功")
      console.log(file)
      console.log(filelist)
      console.log("=====================")
    },
    handleFormatError(file, filelist) {
      console.log("=====================")
      console.log("文件格式不符")
      console.log(file)
      console.log(filelist)
      console.log("=====================")
    },
    handleMaxSize(file, filelist) {
      console.log("=====================")
      console.log("文件大小不符")
      console.log(file)
      console.log(filelist)
      console.log("=====================")
    },
    handleBeforeUpload(file) {
      console.log("=====================")
      console.log("beforeUpload")
      console.log(file)
      console.log("=====================")
      return true;
    },
    handleBeforeRemove(file, fileList) {
      console.log('============ before-remove start =============');
      console.log(file);
      console.log(fileList);
      console.log('============ before-remove end =============');
      return confirm('是否继续删除');
    },
    handleRemove(file, fileList) {
      console.log('============ on-remove start =============');
      console.log(file);
      console.log(fileList);
      console.log('============ on-remove end =============');
    },
    handleUpload (file) {
      this.file = file;
      return false;
    },
    upload () {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('上传成功')
      }, 1500);
    }
  } 
}
</script>
<style type="text/css">
</style>