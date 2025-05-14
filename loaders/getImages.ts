import { AppContext } from "site/apps/site.ts";

export interface Props {
  /**
   * @description The Figma file key to get information from
   * @example "FpnkfUhKcNS9S4JQFJexL"
   */
  fileKey: string;

  /**
   * @description IDs of the nodes you want to get images from
   * @example ["1:2", "1:3"]
   */
  nodeIds: string[];

  /**
   * @description Image scale factor (optional)
   * @example 1
   */
  scale?: number;

  /**
   * @description Image format (optional)
   * @example "png"
   */
  format?: "jpg" | "png" | "svg" | "pdf";

  /**
   * @description Render text elements as outlines in SVGs (optional)
   */
  svg_outline_text?: boolean;

  /**
   * @description Include ID attributes for all SVG elements (optional)
   */
  svg_include_id?: boolean;

  /**
   * @description Include node ID attributes for all SVG elements (optional)
   */
  svg_include_node_id?: boolean;

  /**
   * @description Simplify inner/outer strokes and use stroke attribute if possible (optional)
   */
  svg_simplify_stroke?: boolean;

  /**
   * @description Exclude content that overlaps with the node from rendering (optional)
   */
  contents_only?: boolean;

  /**
   * @description Use the complete dimensions of the node regardless of whether it is cropped or the surrounding space is empty (optional)
   */
  use_absolute_bounds?: boolean;

  /**
   * @description Specific version of the file (optional)
   */
  version?: string;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { fileKey, nodeIds, ...options } = props;
  const figmaAccessToken = ctx.figmaAccessToken;

  const params = new URLSearchParams({
    ids: nodeIds.join(","),
  });

  if (options?.scale) params.append("scale", options.scale.toString());
  if (options?.format) params.append("format", options.format);
  if (options?.svg_outline_text !== undefined) {
    params.append("svg_outline_text", options.svg_outline_text.toString());
  }
  if (options?.svg_include_id !== undefined) {
    params.append("svg_include_id", options.svg_include_id.toString());
  }
  if (options?.svg_include_node_id !== undefined) {
    params.append(
      "svg_include_node_id",
      options.svg_include_node_id.toString(),
    );
  }
  if (options?.svg_simplify_stroke !== undefined) {
    params.append(
      "svg_simplify_stroke",
      options.svg_simplify_stroke.toString(),
    );
  }
  if (options?.contents_only !== undefined) {
    params.append("contents_only", options.contents_only.toString());
  }
  if (options?.use_absolute_bounds !== undefined) {
    params.append(
      "use_absolute_bounds",
      options.use_absolute_bounds.toString(),
    );
  }
  if (options?.version) {
    params.append("version", options.version);
  }

  const response = await fetch(
    `https://api.figma.com/v1/images/${fileKey}?${params}`,
    {
      headers: {
        "X-FIGMA-TOKEN": figmaAccessToken,
      },
    },
  );

  return response.json();
}

export const cache = "no-cache";
