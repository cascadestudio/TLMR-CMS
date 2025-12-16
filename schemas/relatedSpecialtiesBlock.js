export default {
  name: 'relatedSpecialtiesBlock',
  title: 'Related Specialties',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title (optional)',
      type: 'string',
      description: 'Override default "Expertises liées" heading'
    },
    {
      name: 'pages',
      title: 'Related Pages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'moneyPage' }] }],
      validation: Rule => Rule.min(3).required().max(6),
      description: 'Select 3-6 related Money Pages'
    }
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      pages: 'pages'
    },
    prepare({ title, pages }) {
      return {
        title: title || 'Related Specialties',
        subtitle: `${pages?.length || 0} pages`
      }
    }
  }
}
