export default {
  name: 'ctaSection',
  title: 'Section CTA',
  type: 'object',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Titre du CTA',
      placeholder: "Besoin d'un avocat ?",
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 2,
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Texte du bouton',
      placeholder: 'Prendre rendez-vous',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonLink',
      type: 'string',
      title: 'Lien du bouton',
      placeholder: '/contact',
      validation: (Rule) => Rule.required(),
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
      title: 'buttonText',
      subtitle: 'heading',
    },
  },
}
