<template>
  <div class="demo-container">
    <h1>Vue Custom Fields Demo</h1>

    <section class="demo-section">
      <h2>Custom Select</h2>
      <div class="demo-item">
        <label>Select Animation (Slide):</label>
        <CustomSelect
          v-model="selectedCountry"
          :options="countries"
          animation="slide"
          placeholder="Select a country"
          @change="handleCountryChange"
        />
        <p class="selected-value">Selected: {{ selectedCountry || 'None' }}</p>
      </div>

      <div class="demo-item">
        <label>Select Animation (Fade):</label>
        <CustomSelect
          v-model="selectedColor"
          :options="colors"
          animation="fade"
          placeholder="Select a color"
        />
        <p class="selected-value">Selected: {{ selectedColor || 'None' }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>Custom Checkbox</h2>
      <div class="demo-item">
        <CustomCheckbox
          v-model="agreedToTerms"
          label="I agree to the terms and conditions"
          @change="handleCheckboxChange"
        />
      </div>

      <div class="demo-item">
        <CustomCheckbox v-model="newsletter">
          Subscribe to our <strong>newsletter</strong>
        </CustomCheckbox>
      </div>

      <div class="demo-item">
        <CustomCheckbox
          v-model="disabledCheck"
          label="Disabled checkbox"
          disabled
        />
      </div>

      <p class="selected-value">
        Terms: {{ agreedToTerms }}, Newsletter: {{ newsletter }}
      </p>
    </section>

    <section class="demo-section">
      <h2>Custom File Input</h2>
      <div class="demo-item">
        <label>Single File Upload:</label>
        <CustomFileInput
          v-model="singleFile"
          accept="image/*"
          button-text="Choose Image"
          placeholder="No image selected"
          @change="handleFileChange"
        />
      </div>

      <div class="demo-item">
        <label>Multiple Files Upload:</label>
        <CustomFileInput
          v-model="multipleFiles"
          accept=".pdf,.doc,.docx"
          multiple
          button-text="Upload Documents"
        />
      </div>

      <div class="demo-item">
        <label>Disabled File Input:</label>
        <CustomFileInput
          v-model="disabledFile"
          disabled
          button-text="Browse"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomSelect, CustomCheckbox, CustomFileInput, type SelectOption } from '../src/index'

// Select options
const countries: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' }
]

const colors: SelectOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' }
]

// Select values
const selectedCountry = ref('')
const selectedColor = ref('')

// Checkbox values
const agreedToTerms = ref(false)
const newsletter = ref(false)
const disabledCheck = ref(true)

// File values
const singleFile = ref<File | null>(null)
const multipleFiles = ref<File[]>([])
const disabledFile = ref<File | null>(null)

// Event handlers
const handleCountryChange = (value: string | number) => {
  console.log('Country changed to:', value)
}

const handleCheckboxChange = (checked: boolean) => {
  console.log('Terms checkbox:', checked)
}

const handleFileChange = (file: File | File[] | null) => {
  if (file instanceof File) {
    console.log('File selected:', file.name, 'Size:', file.size, 'bytes')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
  padding: 20px;
}

.demo-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.demo-section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.demo-section:last-child {
  border-bottom: none;
}

h2 {
  color: #666;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.demo-item {
  margin-bottom: 20px;
}

.demo-item > label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-weight: 500;
}

.selected-value {
  margin-top: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
}
</style>
