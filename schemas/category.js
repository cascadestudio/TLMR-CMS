export default {
  name: 'category',
  title: 'Catégories',
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
    // SEO Fields (for category list pages)
    {
      name: 'customTitle',
      type: 'string',
      title: 'Titre SEO (optionnel)',
      description:
        'Titre personnalisé pour la page listant les articles de cette catégorie (max 60 caractères)',
      placeholder: 'Articles sur le droit des affaires | Cabinet TLMR',
      validation: (Rule) => Rule.max(60).warning('Le titre SEO ne doit pas dépasser 60 caractères'),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description (optionnelle)',
      description:
        'Description pour les résultats Google de la page de catégorie (120-160 caractères)',
      rows: 3,
      validation: (Rule) =>
        Rule.min(120)
          .warning('Trop court : minimum 120 caractères recommandé')
          .max(160)
          .warning('Trop long : maximum 160 caractères'),
    },
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
