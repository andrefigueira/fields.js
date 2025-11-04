<template>
  <div class="custom-select-wrapper" ref="wrapperRef">
    <button
      type="button"
      class="custom-select"
      :class="{ 'is-open': isOpen }"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      :aria-label="label || 'Select an option'"
    >
      <span class="custom-select__label">{{ displayText }}</span>
      <span class="custom-select__arrow"></span>
    </button>

    <Transition :name="animation === 'slide' ? 'slide' : 'fade'">
      <ul
        v-if="isOpen"
        class="custom-select__list"
        role="listbox"
      >
        <li
          v-for="option in options"
          :key="option.value"
          class="custom-select__option"
          :class="{ 'is-selected': option.value === modelValue }"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options: SelectOption[]
  animation?: 'slide' | 'fade'
  speed?: 'fast' | 'slow' | 'normal'
  label?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'slide',
  speed: 'fast',
  placeholder: 'Select an option'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const isOpen = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const displayText = computed(() => {
  if (!props.modelValue && props.modelValue !== 0) {
    return props.placeholder
  }
  const selectedOption = props.options.find(opt => opt.value === props.modelValue)
  return selectedOption?.label || props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.custom-select-wrapper {
  position: relative;
  display: inline-block;
  min-width: 200px;
}

.custom-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: all 0.3s ease;
}

.custom-select:hover {
  border-color: #999;
}

.custom-select.is-open {
  border-color: #666;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.custom-select__label {
  flex: 1;
}

.custom-select__arrow {
  width: 0;
  height: 0;
  margin-left: 10px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
  transition: transform 0.3s ease;
}

.custom-select.is-open .custom-select__arrow {
  transform: rotate(180deg);
}

.custom-select__list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #666;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-select__option {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-select__option:hover {
  background-color: #f5f5f5;
}

.custom-select__option.is-selected {
  background-color: #e8e8e8;
  font-weight: 500;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.slide-enter-from {
  opacity: 0;
  transform: scaleY(0);
}

.slide-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
