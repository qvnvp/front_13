<template>
  <div class="container">
    <h2 class="form-title">报修信息收集</h2>
    <form>
      <div class="form-group">
        <label for="name">请输入姓名 <span class="required">*</span></label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="dormitory">请输入宿舍楼栋及房间号，如松园一栋101 <span class="required">*</span></label>
        <input type="text" id="dormitory" v-model="dormitory" required>
      </div>
      <div class="form-group">
        <label for="number">请输入电话号码 <span class="required">*</span></label>
        <input type="text" id="number" v-model="number" required>
      </div>
      <div class="form-group">
        <label for="image">请上传需维修处图片 <span class="required">*</span></label>
        <div class="image-upload">
          <input type="file" id="image" accept="image/*" @change="handleImageChange" required>
		   <img class="addphoto" @click="upload" src="/static/services/images/addphoto.png" alt="Upload">
        </div>
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
      number: '',
      image: null
    };
  },
  methods: {
    handleImageChange(event) {
      this.image = event.target.files[0];
    },
    submitForm() {
      if (this.name && this.dormitory && this.number && this.image) {
        // 在这里添加上传图片和其他逻辑
        console.log('提交表单', this.name, this.dormitory, this.number, this.image);
      } else {
      uni.showToast({
          title: '请填写必填项',
          icon: 'none',
          duration: 2000
      });
      }
    }
  }
};
</script>

<style lang="scss">
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
 // border: 1px solid #ffffff;
 // border-radius: 5px;
  background-color: #f9f9f9;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.text{
	
}
.required {
  color: red;
}

.form-title {
  font-size: 20px; /* 调整标题字体大小 */
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
  border: 1px solid #e6f4ff;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image-upload {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.addphoto{
	 width: 60px; /* 调整图标的宽度 */
	height: 60px;
}
.upload-label {
  display: inline-block;
  padding: 8px 15px;
  background-color: #73b0ff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-label:hover {
  background-color: #4977b3;
}

#image {
  display: none;
}

.submit-button {
  display: inline-block;
  padding: 0rpx 150px;
  background-color: #9ccfff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
.form-title {
  font-size: 16px; /* 调整标题字体大小 */
  margin-left: 125px;
  
}
</style>
