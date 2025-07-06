import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Componentes base
import BaseAlert from '@/components/base/BaseAlert.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import BaseDatePicker from '@/components/base/BaseDatePicker.vue'

const app = createApp(App)

app.component('BaseAlert', BaseAlert)
app.component('BaseButton', BaseButton)
app.component('BaseInput', BaseInput)
app.component('BaseSelect', BaseSelect)
app.component('BaseTextarea', BaseTextarea)
app.component('BaseDatePicker', BaseDatePicker)

app.use(router)
app.mount('#app')
