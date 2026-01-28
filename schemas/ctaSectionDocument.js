export default {
  name: 'ctaSectionDocument',
  title: 'CTA Réutilisable',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom du CTA',
      description: 'Pour vous aider à le retrouver (non affiché sur le site)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Titre du CTA',
      description: 'Max 50 caractères pour tenir sur une ligne',
      placeholder: "Besoin d'un avocat ?",
      validation: (Rule) =>
        Rule.max(50).warning(
          'Le titre doit rester court (max 50 caractères) pour tenir sur une ligne'
        ),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Max 60 caractères pour tenir sur 1-2 lignes',
      rows: 2,
      validation: (Rule) =>
        Rule.max(60).warning(
          'La description doit rester courte (max 60 caractères) pour tenir sur 1-2 lignes'
        ),
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Texte du bouton',
      description: 'Max 50 caractères pour tenir sur une ligne',
      placeholder: 'Prendre rendez-vous',
      validation: (Rule) =>
        Rule.required().max(50).error('Le texte du bouton ne doit pas dépasser 50 caractères'),
    },
    {
      name: 'buttonLink',
      type: 'string',
      title: 'Lien du bouton',
      placeholder: '/contact',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isExternalLink',
      type: 'boolean',
      title: 'Lien externe',
      description: "Cocher si le lien pointe vers un site externe (s'ouvrira dans un nouvel onglet)",
      initialValue: false,
    },
    {
      name: 'style',
      type: 'string',
      title: 'Style',
      options: {
        list: [
          {title: 'Principal', value: 'primary'},
          {title: 'Secondaire', value: 'secondary'},
          {title: 'Discret', value: 'subtle'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'buttonText',
    },
  },
}
