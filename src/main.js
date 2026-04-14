import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import posthog from 'posthog-js' 

// Ініціалізація PostHog
posthog.init('phc_wjf6aEJU8u5dqBd38GUjhbNiDftVdd3PX8UcCLATjXUA', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    session_recording: {
        maskAllInputs: true 
    }
})

createApp(App).mount('#app')