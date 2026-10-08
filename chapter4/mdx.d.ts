import type { MDXProps } from 'mdx/types';
import type { ReactElement } from 'react';

declare module '*.mdx' {
    const MDXComponent: (props: MDXProps) => ReactElement;
    export default MDXComponent;
}