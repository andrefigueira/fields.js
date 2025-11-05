<template>
  <div class="custom-file-input-wrapper">
    <input
      ref="fileInputRef"
      type="file"
      class="custom-file-input__input"
      @change="handleFileChange"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      v-bind="$attrs"
    />
    <button
      type="button"
      class="custom-file-input__button"
      :class="{ 'is-disabled': disabled }"
      @click="openFilePicker"
      :disabled="disabled"
    >
      {{ buttonText }}
    </button>
    <span class="custom-file-input__filename" :class="{ 'is-empty': !fileName }">
      {{ fileName || placeholder }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue?: File | File[] | null
  accept?: string
  multiple?: boolean
  disabled?: boolean
  buttonText?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Browse',
  placeholder: 'No file selected'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | File[] | null): void
  (e: 'change', value: File | File[] | null): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

const fileName = computed(() => {
  if (!props.modelValue) return ''

  if (Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 0) return ''
    if (props.modelValue.length === 1) return props.modelValue[0].name
    return `${props.modelValue.length} files selected`
  }

  return props.modelValue.name
})

const openFilePicker = () => {
  if (!props.disabled && fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) {
    emit('update:modelValue', null)
    emit('change', null)
    return
  }

  if (props.multiple) {
    const fileArray = Array.from(files)
    emit('update:modelValue', fileArray)
    emit('change', fileArray)
  } else {
    emit('update:modelValue', files[0])
    emit('change', files[0])
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<style scoped>
.custom-file-input-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.custom-file-input__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.custom-file-input__button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-file-input__button:hover:not(.is-disabled) {
  background-color: #45a049;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-file-input__button:active:not(.is-disabled) {
  transform: translateY(1px);
}

.custom-file-input__button.is-disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.custom-file-input__filename {
  font-size: 14px;
  color: #333;
}

.custom-file-input__filename.is-empty {
  color: #999;
  font-style: italic;
}
</style>
