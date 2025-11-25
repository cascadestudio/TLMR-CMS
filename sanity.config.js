import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {frFRLocale} from '@sanity/locale-fr-fr'

export default defineConfig({
  name: 'default',
  title: 'TLMR',

  projectId: 'i7u835te',
  dataset: 'production',

  plugins: [deskTool(), frFRLocale()],

  schema: {
    types: schemaTypes,
  },
})
