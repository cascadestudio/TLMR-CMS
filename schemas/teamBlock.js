export default {
  name: 'teamBlock',
  title: 'Team Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title (optional)',
      type: 'string',
      description: 'Override default heading'
    },
    {
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      validation: Rule => Rule.min(1).required()
    }
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      members: 'members'
    },
    prepare({ title, members }) {
      return {
        title: title || 'Team Section',
        subtitle: `${members?.length || 0} members`
      }
    }
  }
}
