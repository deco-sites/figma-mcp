import { AppContext } from "site/apps/site.ts";

interface Props {
  /**
   * @description The Figma file key to get information from
   * @example "FpnkfUhKcNS9S4JQFJexL"
   */
  fileKey: string;
  /**
   * @description IDs of the nodes you want to get images from
   * @example "1-2"
   */
  nodeId: string;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const figmaAccessToken = ctx.figmaAccessToken;

  if (!props.fileKey || !props.nodeId) {
    throw new Error("fileKey e nodeId são obrigatórios");
  }

  if (!figmaAccessToken) {
    throw new Error("figmaAccessToken não configurado");
  }

  const response = await fetch(
    `https://api.figma.com/v1/files/${props.fileKey}/nodes?ids=${props.nodeId}`,
    {
      headers: {
        "X-FIGMA-TOKEN": figmaAccessToken,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar componente: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export const cache = "no-cache";
