<template>
  <div
    class="custom-select-wrapper"
    ref="wrapperRef"
    @keydown="handleKeyDown"
  >
    <button
      type="button"
      class="custom-select"
      :class="{ 'is-open': isOpen, 'is-disabled': disabled }"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      :aria-label="ariaLabel || 'Select an option'"
      :aria-haspopup="true"
      :disabled="disabled"
      ref="buttonRef"
    >
      <span class="custom-select__label">{{ displayText }}</span>
      <span class="custom-select__arrow"></span>
    </button>

    <Transition :name="animation === 'slide' ? 'slide' : 'fade'">
      <ul
        v-if="isOpen"
        class="custom-select__list"
        role="listbox"
        :aria-activedescendant="focusedOptionId"
      >
        <li
          v-for="(option, index) in options"
          :key="option.value"
          :id="`option-${index}`"
          class="custom-select__option"
          :class="{
            'is-selected': option.value === modelValue,
            'is-focused': index === focusedIndex
          }"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="selectOption(option)"
          @mouseenter="focusedIndex = index"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options: SelectOption[]
  animation?: 'slide' | 'fade'
  placeholder?: string
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  animation: 'slide',
  placeholder: 'Select an option',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const isOpen = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const focusedIndex = ref(-1)

const displayText = computed(() => {
  if (!props.modelValue && props.modelValue !== 0) {
    return props.placeholder
  }
  const selectedOption = props.options.find(opt => opt.value === props.modelValue)
  return selectedOption?.label || props.placeholder
})

const focusedOptionId = computed(() => {
  return focusedIndex.value >= 0 ? `option-${focusedIndex.value}` : undefined
})

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Set focused index to current selection or first option
    const selectedIndex = props.options.findIndex(opt => opt.value === props.modelValue)
    focusedIndex.value = selectedIndex >= 0 ? selectedIndex : 0
  }
}

const selectOption = (option: SelectOption) => {
  if (props.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
  buttonRef.value?.focus()
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else if (focusedIndex.value >= 0) {
        selectOption(props.options[focusedIndex.value])
      }
      break
    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        isOpen.value = false
        buttonRef.value?.focus()
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else {
        focusedIndex.value = Math.min(focusedIndex.value + 1, props.options.length - 1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        toggleDropdown()
      } else {
        focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      }
      break
    case 'Home':
      if (isOpen.value) {
        event.preventDefault()
        focusedIndex.value = 0
      }
      break
    case 'End':
      if (isOpen.value) {
        event.preventDefault()
        focusedIndex.value = props.options.length - 1
      }
      break
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// Reset focused index when dropdown closes
watch(isOpen, (newValue) => {
  if (!newValue) {
    focusedIndex.value = -1
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true)
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

.custom-select:hover:not(.is-disabled) {
  border-color: #999;
}

.custom-select:focus {
  outline: 2px solid #4CAF50;
  outline-offset: 2px;
}

.custom-select.is-open {
  border-color: #666;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.custom-select.is-disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.custom-select__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-select__arrow {
  width: 0;
  height: 0;
  margin-left: 10px;
  flex-shrink: 0;
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

.custom-select__option:hover,
.custom-select__option.is-focused {
  background-color: #f5f5f5;
}

.custom-select__option.is-selected {
  background-color: #e8e8e8;
  font-weight: 500;
}

.custom-select__option.is-selected.is-focused {
  background-color: #ddd;
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
