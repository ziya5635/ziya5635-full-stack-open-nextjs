import type { MDXComponents } from "mdx/types";
//mdx-components.tsx is required to use @next/mdx with App Router and will not work without it.

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
