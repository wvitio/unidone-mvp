<script setup>
import { ref, computed, onMounted } from 'vue' // 1. ДОДАЛИ onMounted
import { getDaysUntilDeadline, getPriorityColor } from './utils'
import posthog from 'posthog-js' 

// Зчитуємо змінну тут, де Vue точно дозволяє використовувати import.meta
const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'

const deadlineInput = ref('')
const priorityInput = ref('medium')
const showUrgentWarning = ref(false) // 2. ДОДАЛИ ЗМІННУ ДЛЯ ФЛАГА

const daysLeft = computed(() => {
  if (!deadlineInput.value) return null
  return getDaysUntilDeadline(deadlineInput.value)
})

const currentColor = computed(() => getPriorityColor(priorityInput.value))

// ФУНКЦІЇ ДЛЯ ВІДПРАВКИ ПОДІЙ В АНАЛІТИКУ
const trackDeadlineEvent = () => {
  if (deadlineInput.value && daysLeft.value !== null) {
    posthog.capture('deadline_calculated', {
      target_date: deadlineInput.value,
      days_left: daysLeft.value
    });
  }
}

const trackPriorityEvent = () => {
  posthog.capture('priority_changed', {
    selected_priority: priorityInput.value
  });
}

// 3. ПЕРЕВІРКА ФІЧА-ФЛАГА ПРИ ЗАВАНТАЖЕННІ
onMounted(() => {
  posthog.onFeatureFlags(() => {
    showUrgentWarning.value = posthog.isFeatureEnabled('show-urgent-warning')
  })
})
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1>UniDone: Калькулятор дедлайнів</h1>
    
    <div
      class="status-badge"
      style="margin-bottom: 20px; padding: 6px 12px; background-color: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; display: inline-block; font-size: 14px; font-weight: bold; color: #374151;"
    >
      Режим: {{ appStatus }}
    </div>

    <div 
      v-if="showUrgentWarning" 
      style="background-color: #fee2e2; color: #991b1b; padding: 10px; border-radius: 6px; margin-bottom: 15px; font-weight: bold; border: 1px solid #f87171;"
    >
      Увага: Не затягуй з дедлайнами!
    </div>
    
    <div style="margin-bottom: 15px;">
      <label>Обери дедлайн: </label>
      <input
        v-model="deadlineInput"
        type="date"
        data-testid="deadline-input"
        @change="trackDeadlineEvent" 
      > 
    </div>

    <div style="margin-bottom: 15px;">
      <label>Пріоритет: </label>
      <select
        v-model="priorityInput"
        data-testid="priority-select"
        @change="trackPriorityEvent"
      > 
        <option value="high">Високий</option>
        <option value="medium">Середній</option>
        <option value="low">Низький</option>
      </select>
    </div>

    <div
      v-if="daysLeft !== null"
      style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;"
    >
      <h2>Результат:</h2>
      <p data-testid="days-result">
        Днів до здачі: <strong>{{ daysLeft }}</strong>
      </p>
      <p data-testid="priority-result">
        Колір статусу: <span :style="{ color: currentColor, fontWeight: 'bold' }">{{ currentColor }}</span>
      </p>
    </div>
  </div>
</template>