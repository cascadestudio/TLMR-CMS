import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {frFRLocale} from '@sanity/locale-fr-fr'

export default defineConfig({
  name: 'default',
  title: 'TLMR',

  projectId: 'i7u835te',
  dataset: 'production',

  plugins: [structureTool(), frFRLocale()],

  schema: {
    types: schemaTypes,
  },
})
