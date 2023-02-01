import { createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url';
import { PortableText as PortableTextComponent } from '@portabletext/react'

export const sanityClient = createClient({
  projectId: "sweug040",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: false,
});

export const urlFor = (source) => createImageUrlBuilder(sanityClient).image(source);

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />
