export default {
  name: 'teamMember',
  title: "Membres de l'équipe",
  type: 'document',
  fields: [
    {
      name: 'teamType',
      type: 'string',
      title: "Type d'équipe",
      description: 'Détermine le niveau de détail affiché',
      options: {
        list: [
          {title: 'Équipe principale (profil complet)', value: 'core'},
          {title: 'Équipe support et opérationnelle (nom + rôle)', value: 'support'},
        ],
        layout: 'radio',
      },
      initialValue: 'core',
      validation: (Rule) => Rule.required(),
    },
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      description: 'Maximum 400 Ko recommandé (requis pour équipe principale)',
      options: {
        hotspot: true,
      },
      hidden: ({parent}) => parent?.teamType === 'support',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const teamType = context.parent?.teamType
          if (teamType === 'core' && !value) {
            return "La photo est obligatoire pour les membres de l'équipe principale"
          }
          return true
        }),
    },
    {
      name: 'bio',
      type: 'array',
      title: 'Biographie',
      description: "Texte de présentation sur la page de l'équipe",
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
      hidden: ({parent}) => parent?.teamType === 'support',
    },
    {
      name: 'experience',
      type: 'array',
      title: 'Expérience',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      hidden: ({parent}) => parent?.teamType === 'support',
    },
    {
      name: 'engagements',
      type: 'array',
      title: 'Engagements',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      hidden: ({parent}) => parent?.teamType === 'support',
    },
    {
      name: 'linkedinUrl',
      type: 'url',
      title: 'URL LinkedIn',
      hidden: ({parent}) => parent?.teamType === 'support',
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      teamType: 'teamType',
      media: 'photo',
    },
    prepare({title, role, teamType, media}) {
      const typeLabel = teamType === 'support' ? 'Support' : 'Équipe principale'
      return {
        title,
        subtitle: `${typeLabel} • ${role || 'Sans fonction'}`,
        media,
      }
    },
  },
}
