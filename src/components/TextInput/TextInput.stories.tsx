import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextInput } from './TextInput'
import { EyeIcon, MailIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {},
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <>
    <TextInput {...args} />
  </>
)

export const Primary = Template.bind({})
export const WithIcon = Template.bind({})

Primary.args = {
  placeholder: 'sample@sample.com',
  helptext: 'The field value is required.',
  title: 'Full name',
}

WithIcon.args = {
  placeholder: 'sample@sample.com',
  helptext: 'The field value is required.',
  title: 'Full name',
  IconLeft: MailIcon,
  IconRight: EyeIcon,
}
