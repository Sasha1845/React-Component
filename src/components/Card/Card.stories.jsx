import React from "react";
import Card from "./Card";

export default {
  title: "Components/Card",
  component: Card,
};

export const Simple = () => <Card>Simple card content</Card>;

export const WithChildren = () => (
  <Card>
    <h3>Title</h3>
    <p>Some descriptive text inside card. This is a more complex variation.</p>
  </Card>
);

export const ManyElements = () => (
  <Card>
    <h3>Title</h3>
    <p>List:</p>
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  </Card>
);
