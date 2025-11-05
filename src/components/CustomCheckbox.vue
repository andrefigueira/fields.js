<template>
  <div class="custom-checkbox-wrapper">
    <label class="custom-checkbox">
      <input
        type="checkbox"
        class="custom-checkbox__input"
        :checked="modelValue"
        @change="handleChange"
        :disabled="disabled"
        v-bind="$attrs"
      />
      <span
        class="custom-checkbox__box"
        :class="{ 'is-checked': modelValue, 'is-disabled': disabled }"
      >
        <svg
          v-if="modelValue"
          class="custom-checkbox__checkmark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <span v-if="label" class="custom-checkbox__label">
        {{ label }}
      </span>
      <slot v-else />
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<style scoped>
.custom-checkbox-wrapper {
  display: inline-block;
}

.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-checkbox__box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.custom-checkbox:hover .custom-checkbox__box:not(.is-disabled) {
  border-color: #999;
}

.custom-checkbox__box.is-checked {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.custom-checkbox__box.is-disabled {
  background-color: #f5f5f5;
  border-color: #ddd;
  cursor: not-allowed;
  opacity: 0.6;
}

.custom-checkbox__checkmark {
  width: 16px;
  height: 16px;
  color: white;
  animation: checkmark 0.3s ease;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.custom-checkbox__label {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}

.custom-checkbox__box.is-disabled + .custom-checkbox__label {
  color: #999;
  cursor: not-allowed;
}
</style>
