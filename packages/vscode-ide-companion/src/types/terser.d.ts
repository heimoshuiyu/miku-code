declare module 'terser' {
  export interface MinifyOptions {
    [key: string]: unknown;
  }

  export interface MinifyOutput {
    code: string;
    map?: unknown;
    [key: string]: unknown;
  }

  export function minify(
    code: string | { [file: string]: string },
    options?: MinifyOptions,
  ): Promise<MinifyOutput>;
  export function minify_sync(
    code: string | { [file: string]: string },
    options?: MinifyOptions,
  ): MinifyOutput;

  const terser: {
    minify: typeof minify;
    minify_sync: typeof minify_sync;
  };
  export default terser;
}

declare module '@jridgewell/source-map' {
  interface SectionedSourceMapInput {
    [key: string]: unknown;
  }

  interface EncodedSourceMap {
    [key: string]: unknown;
  }

  interface DecodedSourceMap {
    [key: string]: unknown;
  }

  const sourceMap: unknown;
  export default sourceMap;
  export { SectionedSourceMapInput, EncodedSourceMap, DecodedSourceMap };
}
