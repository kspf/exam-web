<template>
  <div class="timeout">
    <van-circle
      v-model:current-rate="rate"
      :rate="100"
      :speed="100"
      size="50px"
      layer-color="#ebedf0"
      :text="String(time)"
    />
  </div>
  <!-- type 1 -->
  <div class="container" v-if="mode == '0'">
    <div class="type_1"> 
      <p>下面数字对应的文字是什么</p>
      <h1>{{currentExam.number}}</h1>
      <van-field v-model="value" label="文字" placeholder="请输入对应的文字" />
    </div>
    <van-button type="primary" size="large" @click="handleNext">下一题</van-button>
  </div>
  <!-- type 2 -->
  <div class="container" v-if="mode == '1'">
    <p>下面图片对应的编码是什么</p>
    <van-image :src="currentExam.img"></van-image>
    <br>
    <van-password-input
      :value="value"
      :mask="false"
      @focus="isKeyboardShow = true"
      length="2"
      info="请输入正确的编码"
    />
    <van-number-keyboard
      :show="isKeyboardShow"
      theme="custom"
      :blur-on-close="false"
      close-button-text="完成"
      @input="onInput"
      @delete="onDelete"
      @blur="onBlur"
      @close="onClose"
    />
  </div>
  <!-- type 3 -->
  <div class="container" v-if="mode == '2'">
    <p>下面文字对应的数字是什么</p>
    <h1>{{currentExam.text}}</h1>
    <br>
    <van-password-input
      :value="value"
      :mask="false"
      @focus="isKeyboardShow = true"
      length="2"
      info="请输入正确的编码"
    />
    <van-number-keyboard
      :show="isKeyboardShow"
      theme="custom"
      :blur-on-close="false"
      close-button-text="完成"
      @input="onInput"
      @delete="onDelete"
      @blur="onBlur"
      @close="onClose"
    />
  </div>

  <div class="button">
    <van-button type="danger" size="large" @click="handleOver">结束练习</van-button>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import data from './../assets/data/data'
import { random } from './../utils/number';
const Route = useRoute()
const Router = useRouter()
const mode = Route.query.mode
const timeOut = Route.query.time
const inputData: any = []
// 输入状态 0 1 正常 2 结束练习
const state = ref(1)

// 结束练习取消倒计时
watch(state, (value) => {
  if (value == 2) {
    clearInterval(interval)
  }
})

// 倒计时
const time = ref(Number(timeOut))
// 当前进度
const rate = computed(() => {
  return 100 / Number(timeOut)  * time.value
})
// 执行倒计时
const interval =  setInterval(() => {
  time.value -= 1
  if (time.value <= 0) {
    handleNext()
  }
}, 1000)

// 计算随机题目
const randomExam = () => {
  const currentExamId = random(0, 110)
  return data[currentExamId]
}
// 是否显示键盘
const isKeyboardShow = ref(true)

let currentExam = ref(randomExam())

const handleNext = () => {
  if (state.value == 2) {
    return
  }
  
  inputData.push({
    // 模式
    mode: mode,
    // 
    original: {
      ...currentExam.value
    },
    answer: {
      answer: value.value
    }
  })

  currentExam.value = randomExam()

  time.value = Number(timeOut)
  value.value = ''
  
  window.sessionStorage.setItem('exam', JSON.stringify(inputData))
}


let value = ref('')

const onInput = (num: number) => {
  console.log(num)
  value.value += String(num)
}
const onDelete = () => {
  const str = value.value
  value.value = str.substr(0, str.length-1);
}
const onBlur = () => {
  console.log("点击了取消键盘")
  isKeyboardShow.value = false
}
const onClose = () => {
  console.log("点击完成按钮")
  handleNext()
}

const handleOver = () => {
  clearInterval(interval)
  state.value = 2
  window.sessionStorage.setItem('exam', JSON.stringify(inputData))
  

   Router.push({
      path: '/result',
      
  })
}

</script>

<style scoped>
.timeout {
  display: flex;
  justify-content: center;
}
.container {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.type_1{
  flex: 1;
  text-align: center;
}
.button {
  width: calc(100% - 20px);
  padding: 20px;
  box-sizing: border-box;
  margin-top: 100px;
}
</style>