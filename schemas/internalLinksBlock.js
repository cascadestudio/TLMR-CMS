import {LinkIcon} from '@sanity/icons'

export default {
  name: 'internalLinksBlock',
  title: 'Bloc de liens internes',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      name: 'sectionTitle',
      type: 'string',
      title: 'Titre de la section',
      description: 'Titre affiché au-dessus des liens (optionnel)',
      initialValue: 'Pour aller plus loin',
    },
    {
      name: 'links',
      type: 'array',
      title: 'Liens internes',
      description: 'Sélectionnez des pages (Money Pages ou Articles) vers lesquelles créer des liens',
      of: [
        {
          type: 'reference',
          to: [{type: 'moneyPage'}, {type: 'article'}],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Ajoutez au moins un lien'),
    },
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      links: 'links',
    },
    prepare({title, links}) {
      const linkCount = links?.length || 0
      return {
        title: title || 'Bloc de liens internes',
        subtitle: `${linkCount} lien${linkCount > 1 ? 's' : ''}`,
      }
    },
  },
}