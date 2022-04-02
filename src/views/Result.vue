<template>
  <van-nav-bar title="练习结果" />
  <div class="container">
    <div id="test"></div>
  </div>
  <div class="footer">
    <van-button type="primary" size="large" @click="handleGoHome"
      >返回首页</van-button
    >
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
const Router = useRouter();
let myChart: any;

onMounted(() => {
  const result: any[] = JSON.parse(
    window.sessionStorage.getItem("exam") || "[]"
  );

  // 正确的题目
  const correct = result.filter((item) => {
    let answer;
    switch (item.mode) {
      case "0":
        answer = item.original.text;
        break;
      case "1":
        answer = item.original.number;
        break;
      case "2":
        answer = item.original.number;
        break;
    }
    return answer == item.answer.answer;
  });
  // 错误的题目
  const error = result.filter((item) => {
    if(!item.answer.answer) {
      return false
    }
    let answer;
    switch (item.mode) {
      case "0":
        answer = item.original.text;
        break;
      case "1":
        answer = item.original.number;
        break;
      case "2":
        answer = item.original.number;
        break;
    }
    return answer != item.answer.answer;
  });
  // 未作答的题目
  const blank = result.filter((item) => !item.answer.answer);
  console.log(document.querySelector("#test"));
  myChart = echarts.init(
    document.querySelector("#test") || document.createElement("div")
  );
  // 绘制图表
  myChart.setOption({
    title: {
      text: "本次练习详情",
      subtext: `本次共练习${result.length}个题`,
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "吕同学",
        type: "pie",
        radius: "60%",
        data: [
          { value: error.length, name: "错误" },
          { value: correct.length, name: "正确" },
          { value: blank.length, name: "未作答" },
        ],
      },
    ],
  });
});

onUnmounted(() => {
  myChart.dispose();
});

const handleGoHome = () => {
  window.sessionStorage.removeItem("exam");
  Router.push({
    path: "/home",
  });
};
</script>

<style scoped>
.container {
  flex: 1;
  display: flex;
}
#test {
  flex: 1;
}
</style>