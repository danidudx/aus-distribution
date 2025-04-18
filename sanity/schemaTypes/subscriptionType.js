import {defineField, defineType} from 'sanity'

export const subscriptionType = defineType({
  name: 'subscription',
  title: 'Subscription',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'status',
      title: 'Subscription Status',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'status',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle ? 'Subscribed' : 'Unsubscribed'
      }
    },
  },
})