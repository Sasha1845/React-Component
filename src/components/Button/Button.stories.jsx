import React from "react";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["small", "medium", "large"] },
  },
};

const Template = (args) => <Button {...args}>Click me</Button>;

export const Primary = Template.bind({});
Primary.args = { variant: "primary", size: "medium" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary", size: "medium" };

export const Large = Template.bind({});
Large.args = { variant: "primary", size: "large" };
