export default {
  name: 'customHTMLBlock',
  title: 'Bloc HTML personnalisé',
  type: 'object',
  description: 'Pour les scripts de tracking, intégrations ponctuelles, ou code HTML personnalisé',
  fields: [
    {
      name: 'html',
      type: 'text',
      title: 'Code HTML',
      description: 'Collez votre code HTML, JavaScript, ou scripts de tracking ici',
      rows: 8,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description (interne)',
      description: 'Pour vous rappeler à quoi sert ce bloc (non affiché)',
      placeholder: 'Ex: Script Google Analytics, Pixel Facebook, etc.',
    },
  ],
  preview: {
    select: {
      description: 'description',
      html: 'html',
    },
    prepare({description, html}) {
      const preview = description || html?.substring(0, 50) || 'Bloc HTML vide'
      return {
        title: 'Bloc HTML personnalisé',
        subtitle: preview,
      }
    },
  },
}
