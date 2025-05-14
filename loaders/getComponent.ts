import { AppContext } from "site/apps/site.ts";

export default async function loader(
  props: { key: string; nodeId: string },
  _req: Request,
  ctx: AppContext,
) {
  const figmaAccessToken = ctx.figmaAccessToken;

  if (!props.key || !props.nodeId) {
    throw new Error("key e nodeId são obrigatórios");
  }

  if (!figmaAccessToken) {
    throw new Error("figmaAccessToken não configurado");
  }

  const response = await fetch(
    `https://api.figma.com/v1/files/${props.key}/nodes?ids=${props.nodeId}`,
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
