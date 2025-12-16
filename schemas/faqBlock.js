export default {
  name: 'faqBlock',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title (optional)',
      type: 'string',
      description: 'Override default "Questions fréquentes" heading'
    },
    {
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [{ type: 'faqItem' }],
      validation: Rule => Rule.min(1).required()
    }
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      items: 'items'
    },
    prepare({ title, items }) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${items?.length || 0} questions`
      }
    }
  }
}
