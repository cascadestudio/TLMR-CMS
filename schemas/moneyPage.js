export default {
  name: 'moneyPage',
  title: 'Money Page',
  type: 'document',
  description: 'Pages de conversion ciblant des mots-clés spécifiques',
  fields: [
    // BASIC INFO
    {
      name: 'title',
      type: 'string',
      title: 'Titre interne',
      description: "Pour l'organisation dans le CMS uniquement",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL',
      options: {
        source: 'title',
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
      name: 'customH1',
      type: 'string',
      title: 'Titre H1',
      description: 'Titre principal de la page (peut différer du titre SEO)',
      validation: (Rule) => Rule.required(),
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
      ],
      validation: (Rule) => Rule.required(),
    },

    // CTA SECTIONS
    {
      name: 'ctaSections',
      type: 'array',
      title: 'Sections CTA',
      description: "Appels à l'action stratégiques dans la page",
      of: [{type: 'ctaSection'}],
    },

    // FAQ SECTION
    {
      name: 'faqItems',
      type: 'array',
      title: 'FAQ',
      description: 'Questions fréquentes avec Schema.org FAQPage',
      of: [{type: 'faqItem'}],
    },

    // RELATED SPECIALTIES
    {
      name: 'relatedSpecialties',
      type: 'array',
      title: 'Spécialités connexes',
      description: 'Liens vers autres Money Pages (minimum 3 recommandé)',
      of: [
        {
          type: 'reference',
          to: [{type: 'moneyPage'}],
        },
      ],
      validation: (Rule) =>
        Rule.min(3).warning('Au moins 3 pages connexes sont recommandées pour le SEO'),
    },

    // TEAM SECTION
    {
      name: 'teamMembers',
      type: 'array',
      title: "Membres de l'équipe à afficher",
      description: 'Avocats à mettre en avant sur cette page',
      of: [
        {
          type: 'reference',
          to: [{type: 'teamMember'}],
        },
      ],
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
