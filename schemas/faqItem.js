import {LinkIcon, DocumentIcon} from '@sanity/icons'

export default {
  name: 'faqItem',
  title: 'Question FAQ',
  type: 'object',
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      type: 'array',
      title: 'Réponse',
      description: 'Peut inclure des liens internes',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien externe',
                icon: LinkIcon,
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Lien interne',
                icon: DocumentIcon,
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Page',
                    to: [{type: 'moneyPage'}, {type: 'article'}],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
}
