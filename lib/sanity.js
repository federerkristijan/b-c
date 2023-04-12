import { createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url';
import {definePreview} from 'next-sanity/preview'
import { PortableText as PortableTextComponent } from '@portabletext/react'

export const sanityClient = createClient({
  projectId: "sweug040",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: false,
});

const usePreview = definePreview(sanityClient);

export const urlFor = (source) => createImageUrlBuilder(sanityClient).image(source);

export const PortableText = (props) => <PortableTextComponent components={{}} {...props} />
