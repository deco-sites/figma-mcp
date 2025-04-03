import website, { Props as WebsiteProps } from "apps/website/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type App as App, type AppContext as AC } from "@deco/deco";
import { Secret } from "apps/website/loaders/secret.ts";

type WebsiteApp = ReturnType<typeof website>;

interface Props extends WebsiteProps {
    figmaAccessToken: Secret;
}
type PropsWithKeys = Omit<Props, "figmaAccessToken"> & {
    figmaAccessToken: string;
};
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(state: Props): App<Manifest, PropsWithKeys, [
  WebsiteApp,
]> {
  return {
    state: { ...state, figmaAccessToken: state.figmaAccessToken?.get() ?? "" },
    manifest,
    dependencies: [
      website(state),
    ],
  };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
