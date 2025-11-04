# Vue Custom Fields

A modern Vue 3 plugin for creating beautifully styled form elements (selects, checkboxes, and file inputs) with full TypeScript support.

Originally a jQuery plugin, now completely rewritten for Vue 3 using the Composition API and modern web standards.

## Features

- 🎨 Beautiful, customizable form components
- 🔧 TypeScript support out of the box
- ⚡ Built with Vue 3 Composition API
- 🎭 Smooth animations (slide/fade)
- ♿ Accessible (ARIA labels, keyboard navigation)
- 📦 Tree-shakeable - import only what you need
- 🎯 v-model support for seamless two-way binding
- 🌈 Easy to style and customize

## Installation

```bash
npm install vue-custom-fields
# or
yarn add vue-custom-fields
# or
pnpm add vue-custom-fields
```

## Usage

### Global Registration

Register the plugin globally in your Vue app:

```typescript
import { createApp } from 'vue'
import VueCustomFields from 'vue-custom-fields'
import 'vue-custom-fields/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueCustomFields)
app.mount('#app')
```

### Individual Component Import

Import and use components individually:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CustomSelect, CustomCheckbox, CustomFileInput } from 'vue-custom-fields'
import 'vue-custom-fields/style.css'

const selectedValue = ref('')
const isChecked = ref(false)
const selectedFile = ref<File | null>(null)

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
]
</script>

<template>
  <div>
    <CustomSelect
      v-model="selectedValue"
      :options="options"
      placeholder="Choose an option"
    />

    <CustomCheckbox
      v-model="isChecked"
      label="Accept terms and conditions"
    />

    <CustomFileInput
      v-model="selectedFile"
      accept="image/*"
      button-text="Upload Image"
    />
  </div>
</template>
```

## Components

### CustomSelect

A custom styled select dropdown with smooth animations.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | `undefined` | The selected value (v-model) |
| `options` | `SelectOption[]` | **required** | Array of options |
| `animation` | `'slide' \| 'fade'` | `'slide'` | Animation type for dropdown |
| `speed` | `'fast' \| 'slow' \| 'normal'` | `'fast'` | Animation speed |
| `label` | `string` | `undefined` | Accessibility label |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |

#### Events

- `update:modelValue` - Emitted when selection changes
- `change` - Emitted when selection changes

#### Example

```vue
<template>
  <CustomSelect
    v-model="selectedCountry"
    :options="countries"
    animation="fade"
    placeholder="Select a country"
    @change="handleCountryChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomSelect, type SelectOption } from 'vue-custom-fields'

const selectedCountry = ref('')
const countries: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' }
]

const handleCountryChange = (value: string | number) => {
  console.log('Selected country:', value)
}
</script>
```

### CustomCheckbox

A beautiful custom checkbox with smooth check animation.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Checked state (v-model) |
| `label` | `string` | `undefined` | Label text |
| `disabled` | `boolean` | `false` | Disabled state |

#### Events

- `update:modelValue` - Emitted when checkbox state changes
- `change` - Emitted when checkbox state changes

#### Example

```vue
<template>
  <CustomCheckbox
    v-model="agreedToTerms"
    label="I agree to the terms and conditions"
    @change="handleCheckboxChange"
  />

  <!-- With slot for custom label -->
  <CustomCheckbox v-model="newsletter">
    Subscribe to our <strong>newsletter</strong>
  </CustomCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomCheckbox } from 'vue-custom-fields'

const agreedToTerms = ref(false)
const newsletter = ref(false)

const handleCheckboxChange = (checked: boolean) => {
  console.log('Checkbox state:', checked)
}
</script>
```

### CustomFileInput

A styled file input with file name display.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `File \| File[] \| null` | `null` | Selected file(s) (v-model) |
| `accept` | `string` | `undefined` | Accepted file types |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `disabled` | `boolean` | `false` | Disabled state |
| `buttonText` | `string` | `'Browse'` | Button text |
| `placeholder` | `string` | `'No file selected'` | Placeholder text |

#### Events

- `update:modelValue` - Emitted when file selection changes
- `change` - Emitted when file selection changes

#### Example

```vue
<template>
  <div>
    <!-- Single file -->
    <CustomFileInput
      v-model="avatar"
      accept="image/png,image/jpeg"
      button-text="Choose Avatar"
      placeholder="No avatar selected"
      @change="handleFileChange"
    />

    <!-- Multiple files -->
    <CustomFileInput
      v-model="documents"
      accept=".pdf,.doc,.docx"
      multiple
      button-text="Upload Documents"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomFileInput } from 'vue-custom-fields'

const avatar = ref<File | null>(null)
const documents = ref<File[]>([])

const handleFileChange = (file: File | File[] | null) => {
  if (file instanceof File) {
    console.log('Selected file:', file.name)
  }
}
</script>
```

## Customization

All components are designed to be easily customizable with CSS. Each component uses scoped styles with CSS custom properties for easy theming.

### Custom Styling

You can override the default styles by targeting the component classes:

```css
/* Customize select dropdown */
.custom-select {
  border-color: #your-color;
  border-radius: 8px;
}

.custom-select__option:hover {
  background-color: #your-hover-color;
}

/* Customize checkbox */
.custom-checkbox__box.is-checked {
  background-color: #your-primary-color;
}

/* Customize file input button */
.custom-file-input__button {
  background-color: #your-button-color;
}
```

## TypeScript Support

The plugin is written in TypeScript and includes full type definitions. All props, events, and component types are exported for your convenience.

```typescript
import type { SelectOption } from 'vue-custom-fields'

const options: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 }
]
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Vue 3.3.0+

## Migration from v1.x (jQuery version)

The new version is a complete rewrite for Vue 3. Key differences:

- **jQuery dependency removed** - Now uses Vue's reactivity system
- **Component-based** - Use as Vue components instead of jQuery plugin
- **v-model support** - Full two-way data binding
- **TypeScript** - Full type safety and IntelliSense support
- **Modern build** - ESM and UMD builds with Vite

Old (v1.x):
```javascript
$('#network').fields({ label: true })
```

New (v2.x):
```vue
<CustomSelect v-model="network" :options="options" />
```

## License

GPL-3.0-or-later

Copyright (c) 2013-2024 André Figueira

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

André Figueira

## Changelog

### v2.0.0
- Complete rewrite for Vue 3
- TypeScript support
- Composition API
- Modern build system (Vite)
- Improved accessibility
- Better animations
- v-model support
