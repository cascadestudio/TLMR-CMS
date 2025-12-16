import {LinkIcon, DocumentIcon} from '@sanity/icons'

export default {
  name: 'category',
  title: 'Catégories',
  type: 'document',
  description: 'Page de catégorie affichant une liste d\'articles',
  fields: [
    // BASIC INFO
    {
      name: 'customH1',
      type: 'string',
      title: 'Titre H1',
      description: 'Titre principal de la page de catégorie',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL',
      options: {
        source: 'customH1',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    // SEO FIELDS
    {
      name: 'customTitle',
      type: 'string',
      title: 'Titre SEO (balise <title>)',
      description:
        'Titre optimisé pour le SEO (max 60 caractères). DOIT commencer par le mot-clé exact.',
      placeholder: 'Actualités droit des affaires | Cabinet TLMR',
      validation: (Rule) => Rule.max(60).warning('Le titre SEO ne doit pas dépasser 60 caractères'),
      fieldset: 'seo',
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description:
        'Description affichée dans les résultats Google (155-160 caractères recommandés)',
      rows: 3,
      validation: (Rule) =>
        Rule.min(120)
          .warning('Trop court : minimum 120 caractères recommandé')
          .max(160)
          .warning('Trop long : maximum 160 caractères'),
      fieldset: 'seo',
    },
    {
      name: 'canonicalUrl',
      type: 'url',
      title: 'URL Canonique',
      description: "Laisser vide pour générer automatiquement l'URL canonique à partir du slug",
      fieldset: 'seo',
    },

    // MAIN CONTENT
    {
      name: 'mainContent',
      type: 'array',
      title: 'Contenu éditorial principal',
      description: 'Contenu riche avec liens internes pour le SEO (avant la grille d\'articles)',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Titre 2', value: 'h2'},
            {title: 'Titre 3', value: 'h3'},
            {title: 'Titre 4', value: 'h4'},
          ],
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
        {
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              description: 'Important pour le SEO',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Légende (optionnel)',
            },
          ],
        },
        {type: 'table'},
        {
          type: 'reference',
          title: 'CTA (bibliothèque)',
          description: 'Réutiliser un CTA existant de votre bibliothèque',
          to: [{type: 'ctaSectionDocument'}],
          options: {
            filter: 'defined(_id)',
          },
          weak: false,
        },
      ],
    },
  ],
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    select: {
      title: 'customH1',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Sans titre H1',
        subtitle: slug ? `/${slug}` : 'Sans slug',
      }
    },
  },
}
