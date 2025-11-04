# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-11-04

### Changed
- **BREAKING**: Complete rewrite from jQuery plugin to Vue 3 plugin
- **BREAKING**: Changed from jQuery-based initialization to Vue component-based architecture
- **BREAKING**: Removed jQuery dependency
- Migrated to TypeScript for full type safety
- Migrated to Vue 3 Composition API
- Updated build system to Vite
- Modern ESM and UMD module formats

### Added
- Full TypeScript support with type definitions
- Three new Vue components:
  - `CustomSelect` - Modern select dropdown with animations
  - `CustomCheckbox` - Styled checkbox with smooth animations
  - `CustomFileInput` - Custom file input with file preview
- v-model support for all components
- Proper accessibility with ARIA labels
- Smooth animations (slide/fade)
- Comprehensive documentation with examples
- Demo application
- Tree-shakeable exports
- Event emissions for component state changes

### Improved
- Better browser performance without jQuery overhead
- Modern reactivity with Vue's reactive system
- Better accessibility
- Improved animations and transitions
- Better customization options

### Removed
- jQuery dependency
- Legacy browser support (now requires modern browsers)
- jQuery-style initialization

## [1.0.2] - 2013

### Added
- Initial jQuery plugin release
- Custom select dropdowns
- Custom checkboxes
- Custom file inputs
- Basic animations
