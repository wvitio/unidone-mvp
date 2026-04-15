import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import posthog from 'posthog-js' 
import * as Sentry from '@sentry/vue' 
const app = createApp(App) 
// Ініціалізація Sentry
Sentry.init({
    app,
    dsn: 'https://278ebeb090decfc8de05e251cb4b9c56@o4511225570787328.ingest.de.sentry.io/4511225579307088',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0, 
    replaysOnErrorSampleRate: 1.0, 
    environment: 'development', 
  });

// ПЕРЕДАЧА КОНТЕКСТУ КОРИСТУВАЧА
Sentry.setUser({
    id: '777',
    email: 'viktor.student@gmail.com', // твоя пошта
    segment: 'pro_user',
  });
  
  // КАСТОМНІ ТЕГИ ДЛЯ СЕГМЕНТАЦІЇ
  Sentry.setTag('project', 'unidone-mvp');
  Sentry.setTag('university', 'lpnu');
  Sentry.setTag('group', 'PP-33');

// Ініціалізація PostHog
posthog.init('phc_wjf6aEJU8u5dqBd38GUjhbNiDftVdd3PX8UcCLATjXUA', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    session_recording: {
        maskAllInputs: true 
    }
})

app.mount('#app')