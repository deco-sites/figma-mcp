// DO NOT EDIT. This file is generated by deco.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $$$$$$$$$$$0 from "./apps/deco/blog.ts";
import * as $$$$$$$$$$$1 from "./apps/deco/htmx.ts";
import * as $$$$$$$$$$$2 from "./apps/site.ts";
import * as $$$0 from "./loaders/getComponent.ts";

const manifest = {
  "loaders": {
    "site/loaders/getComponent.ts": $$$0,
  },
  "apps": {
    "site/apps/deco/blog.ts": $$$$$$$$$$$0,
    "site/apps/deco/htmx.ts": $$$$$$$$$$$1,
    "site/apps/site.ts": $$$$$$$$$$$2,
  },
  "name": "site",
  "baseUrl": import.meta.url,
};

export type Manifest = typeof manifest;

export default manifest;
