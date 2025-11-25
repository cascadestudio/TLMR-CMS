export default {
  name: 'teamMember',
  title: "Membres de l'équipe",
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom complet',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Fonction',
      placeholder: 'Avocat associé',
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      description: 'Maximum 400 Ko recommandé',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL',
      description: 'Pour la page de profil individuelle',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      type: 'array',
      title: 'Biographie',
      description: 'Pour la page de profil individuelle',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Titre 2', value: 'h2'},
            {title: 'Titre 3', value: 'h3'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [{title: 'Emphasis', value: 'em'}],
          },
        },
      ],
    },
    {
      name: 'specialties',
      type: 'array',
      title: 'Spécialités',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Téléphone',
    },
    {
      name: 'linkedIn',
      type: 'url',
      title: 'LinkedIn',
    },
    // SEO Fields for team member profile pages
    {
      name: 'customTitle',
      type: 'string',
      title: 'Titre SEO (balise <title>)',
      description:
        'Titre optimisé pour le SEO (max 60 caractères). Laissez vide pour générer automatiquement.',
      placeholder: 'Jean Dupont - Avocat droit des affaires | Cabinet TLMR',
      validation: (Rule) => Rule.max(60).warning('Le titre SEO ne doit pas dépasser 60 caractères'),
      fieldset: 'seo',
    },
    {
      name: 'customH1',
      type: 'string',
      title: 'Titre H1',
      description:
        'Titre principal de la page (peut différer du titre SEO). Laissez vide pour utiliser le nom.',
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
        Rule.custom((value) => {
          if (!value) return true
          const length = value.length
          if (length < 120) {
            return `Trop court : ${length}/120 caractères minimum recommandé`
          }
          if (length > 160) {
            return `Trop long : ${length}/160 caractères maximum`
          }
          return true
        }),
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
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
}
