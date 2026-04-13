<script setup>
import { ref, computed } from 'vue'
import { getDaysUntilDeadline, getPriorityColor } from './utils'

// Зчитуємо змінну тут, де Vue точно дозволяє використовувати import.meta
const appStatus = import.meta.env.VITE_APP_STATUS || 'Development'

const deadlineInput = ref('')
const priorityInput = ref('medium')

const daysLeft = computed(() => {
  if (!deadlineInput.value) return null
  return getDaysUntilDeadline(deadlineInput.value)
})

const currentColor = computed(() => getPriorityColor(priorityInput.value))
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
    
    <div style="margin-bottom: 15px;">
      <label>Обери дедлайн: </label>
      <input
        v-model="deadlineInput"
        type="date"
        data-testid="deadline-input"
      >
    </div>

    <div style="margin-bottom: 15px;">
      <label>Пріоритет: </label>
      <select
        v-model="priorityInput"
        data-testid="priority-select"
      >
        <option value="high">
          Високий
        </option>
        <option value="medium">
          Середній
        </option>
        <option value="low">
          Низький
        </option>
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