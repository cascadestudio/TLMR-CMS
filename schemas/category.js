export default {
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  description: 'Catégories pour organiser les articles',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Nom de la catégorie',
      description: 'Nom affiché publiquement',
      placeholder: 'Droit des affaires',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Utilisé dans les URLs',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Description de la catégorie',
      rows: 3,
    },
    {name: 'customTitle', type: 'string', validation: (Rule) => Rule.max(60)},
    {name: 'metaDescription', type: 'text', validation: (Rule) => Rule.min(120).max(160)},
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sans nom',
        subtitle: subtitle ? `/${subtitle}` : 'Pas de slug',
      }
    },
  },
}
