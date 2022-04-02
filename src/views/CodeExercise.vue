<template>
    <div id="content">
            <van-cell-group>
            <van-cell title="选择练习模式" :value="result.text" @click="showPopup" arrow-direction="down" is-link />
            <van-cell title="每一题倒计时" value="内容" >
                <van-stepper v-model="gameTimeOut" :min="3" />
            </van-cell>
        </van-cell-group>
    </div>

    <van-button type="primary" size="large" @click="onSubmit">开始练习</van-button>
    <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker title="选择记忆模式"  @cancel="showPicker = false" @confirm="onConfirm" :columns="modeList" />
    </van-popup>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router';

    const Router = useRouter()

    const  getTime = localStorage.getItem('gameTimeOut') || 3

    const gameTimeOut = ref(Number(getTime))

    const initMode =  Number(localStorage.getItem('initMode') || 0)
    
    const showPicker = ref(false);
    const showPopup = () => {
      showPicker.value = true;
    };

    const modeList = reactive([
        {
            mode: 0,
            text: '按数字'
        },
        {
            mode: 1,
            text: '按图片'
        },
        {
            mode: 2,
            text: '按中文'
        },
    ])

    const result = ref(modeList[initMode]);

    const onConfirm = (value: any) => {
      result.value = value;
      showPicker.value = false;
    }

    const onSubmit = () => {
        localStorage.setItem('gameTimeOut', String(gameTimeOut.value))
        localStorage.setItem('initMode', String(result.value.mode))
        Router.push({
            path: '/practice',
            query: {
                mode: result.value.mode,
                time: gameTimeOut.value
            }
        })
    }

</script>

<style scoped>
    #content {
        flex: 1;
    }
</style>