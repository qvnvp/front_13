<template>
  <div class="container">
    <h2>报修信息收集</h2>
    <form>
      <div class="form-group">
        <label for="name">姓名</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="dormitory">宿舍楼栋及房间号</label>
        <input type="text" id="dormitory" v-model="dormitory" required>
      </div>
	  <div class="contract">
	    <label for="number">电话号码</label>
	    <input type="text" id="number" v-model="number" required>
	  </div>
      <div class="form-group">
        <label for="image">请上传图片</label>
        <input type="file" id="image" accept="image/*" @change="handleImageChange" required>
      </div>
      <button class="submit-button" type="submit" @click.prevent="submitForm">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      dormitory: '',
	  number:'',
      image: null
    };
  },
  methods: {
    handleImageChange(event) {
      this.image = event.target.files[0];
    },
    submitForm() {
      // 在这里添加上传图片和其他逻辑
      console.log('提交表单', this.name, this.dormitory,this.number, this.image);
    }
  }
};
</script>

<style lang="scss">
/* 添加您的样式 */
</style>
