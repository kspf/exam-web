import { createApp } from 'vue'
import App from './App.vue'
import { Button, Stepper, Cell, CellGroup, Picker, Popup, Circle, Image as VanImage, NumberKeyboard, PasswordInput, NavBar, Field } from 'vant';
import { router } from './route'
import './assets/css/base.css'

createApp(App)
.use(router)
.use(Button)
.use(Stepper)
.use(Cell)
.use(CellGroup)
.use(Picker)
.use(Popup)
.use(Circle)
.use(VanImage)
.use(PasswordInput)
.use(NumberKeyboard)
.use(NavBar)
.use(Field)
.mount('#app')
