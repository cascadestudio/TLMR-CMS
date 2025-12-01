export default {
  name: 'article',
  type: 'document',
  title: 'Articles',
  orderings: [
    {
      title: 'most recent',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'oldest',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
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
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImg',
      type: 'image',
      title: "Image d'en tête",
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      placeholder: new Date().toLocaleDateString('fr-FR'),
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Auteur',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      description: 'Catégories auxquelles appartient cet article',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
      validation: (Rule) => Rule.min(1).warning('Au moins une catégorie est recommandée'),
    },
    {
      name: 'content',
      type: 'array',
      title: "Contenu de l'article",
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
            decorators: [{title: 'Emphasis', value: 'em'}],
          },
        },
        {
          type: 'image',
          title: 'Image',
          fields: [
            {
              name: 'link',
              type: 'url',
              title: "Lien de l'image (optionnel)",
            },
          ],
        },
        {
          type: 'youtube',
        },
        {
          type: 'customHTMLBlock',
          title: 'Bloc HTML personnalisé',
        },
        {type: 'table'},
      ],
    },
    // SEO Fields
    {
      name: 'customTitle',
      type: 'string',
      title: 'Titre SEO (balise <title>)',
      description:
        'Titre optimisé pour le SEO (max 60 caractères). Doit commencer par le mot-clé principal.',
      placeholder: 'Avocat droit des affaires Paris | Cabinet TLMR',
      validation: (Rule) => Rule.max(60).warning('Le titre SEO ne doit pas dépasser 60 caractères'),
      fieldset: 'seo',
    },
    {
      name: 'customH1',
      type: 'string',
      title: 'Titre H1',
      description:
        "Titre principal de la page (peut différer du titre SEO). Utilisé si renseigné, sinon le titre de l'article sera utilisé.",
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
  ],
}
