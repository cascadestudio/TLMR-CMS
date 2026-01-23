import {LinkIcon, DocumentIcon} from '@sanity/icons'

export default {
  name: 'moneyPage',
  title: 'Money Page',
  type: 'document',
  description: 'Pages de conversion ciblant des mots-clés spécifiques',
  fields: [
    // BASIC INFO
    {
      name: 'customH1',
      type: 'string',
      title: 'Titre H1',
      description: 'Titre principal de la page',
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

    // SEO FIELDS (Critical Priority ⭐⭐⭐⭐⭐)
    {
      name: 'customTitle',
      type: 'string',
      title: 'Titre SEO (balise <title>)',
      description:
        'Titre optimisé pour le SEO (max 60 caractères). DOIT commencer par le mot-clé exact.',
      placeholder: 'Avocat droit des affaires Paris | Cabinet TLMR',
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
    {
      name: 'ogImage',
      type: 'image',
      title: 'Image Open Graph',
      description: 'Image affichee lors du partage sur les reseaux sociaux (1200x630px recommande)',
      options: {
        hotspot: true,
      },
      fieldset: 'seo',
    },

    // MAIN CONTENT
    {
      name: 'mainContent',
      type: 'array',
      title: 'Contenu principal',
      description: 'Contenu riche avec liens internes pour le SEO',
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
        {
          type: 'customHTMLBlock',
          title: 'Bloc HTML personnalisé',
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
        {
          type: 'faqBlock',
          title: 'Section FAQ',
        },
        {
          type: 'teamBlock',
          title: 'Section Équipe',
        },
        {
          type: 'relatedSpecialtiesBlock',
          title: 'Spécialités connexes',
        },
        {
          type: 'internalLinksBlock',
          title: 'Bloc de liens internes (maillage)',
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // DEPRECATED FIELDS - kept for backward compatibility during migration
    // Use the new block types in mainContent instead
    {
      name: 'faqItems',
      type: 'array',
      title: 'FAQ (Deprecated - Use FAQ Block in mainContent)',
      description: 'Questions fréquentes avec Schema.org FAQPage',
      of: [{type: 'faqItem'}],
      hidden: true,
    },

    {
      name: 'relatedSpecialties',
      type: 'array',
      title: 'Spécialités connexes (Deprecated - Use Related Specialties Block in mainContent)',
      description: 'Liens vers autres Money Pages (minimum 3 recommandé)',
      of: [
        {
          type: 'reference',
          to: [{type: 'moneyPage'}],
        },
      ],
      hidden: true,
    },

    {
      name: 'teamMembers',
      type: 'array',
      title: "Membres de l'équipe (Deprecated - Use Team Block in mainContent)",
      description: 'Avocats à mettre en avant sur cette page',
      of: [
        {
          type: 'reference',
          to: [{type: 'teamMember'}],
        },
      ],
      hidden: true,
    },

    // SOCIAL PROOF - GOOGLE REVIEWS
    {
      name: 'showGoogleReviews',
      type: 'boolean',
      title: 'Afficher les avis Google My Business',
      description: 'Importe automatiquement les avis GMB',
      initialValue: true,
    },

    // DYNAMIC UPDATE TEXT
    {
      name: 'showUpdateDate',
      type: 'boolean',
      title: 'Afficher la date de mise à jour',
      description: 'Ex: "Page mise à jour en novembre 2025"',
      initialValue: true,
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
      subtitle: 'customTitle',
      slug: 'slug.current',
    },
    prepare({title, subtitle, slug}) {
      return {
        title: title || 'Sans titre H1',
        subtitle: slug ? `/${slug}` : subtitle,
      }
    },
  },
}
