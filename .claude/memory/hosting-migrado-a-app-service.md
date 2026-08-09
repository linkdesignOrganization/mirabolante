---
name: hosting-migrado-a-app-service
description: mirabolante-web se hospeda en Azure App Service (migración completa; SWA decomisionado)
metadata: 
  node_type: memory
  type: project
  originSessionId: fd9a1c27-3c4f-4aff-a629-09ae625e33a9
---

El sitio mirabolante se migró de Azure Static Web App a **App Service** el 2026-05-31 (plan homólogo al de HESA). Migración **completa** (Fases 1-5).

- **URL pública**: `https://mirabolante-web.azurewebsites.net` (sin dominio custom, sin DNS).
- **App Service** `mirabolante-web` en RG `Mirabolante-RG`, reusando el plan B3 compartido `ASP-WebSite-b6c1` (RG `WebSite`, East US 2, Linux). Sirve vía `server.js` zero-dep en la raíz del repo (SPA fallback fiel al exclude del SWA + baseline de hardening headers sin CSP + gzip de texto + Range para video) con `WEBSITE_RUN_FROM_PACKAGE=1`, startup `node server.js`, sin `WEBSITES_PORT`.
- **CI**: `.github/workflows/azure-appservice-mirabolante.yml` despliega por **OIDC** (app reg `github-actions-mirabolante-deploy`, client-id `5987dd53-11a9-4960-b522-46e304222487`, role *Website Contributor* scoped solo al sitio; federated credential para `refs/heads/main`). Repo variables `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID`.
- **SWA decomisionado** (2026-05-31): se borró el recurso `Microsoft.Web/staticSites/mirabolante-web` (host `happy-meadow-0a989770f.6.azurestaticapps.net`, ahora 404), su workflow `azure-static-web-apps.yml` y el secret `AZURE_STATIC_WEB_APPS_API_TOKEN`. Ahorro ~$9/mes.

Pendiente opcional menor: bumpear las GitHub Actions (`checkout`, `setup-node`, `azure/login`) a versiones con Node 24 antes del 16-jun-2026 (hoy solo emiten warning). El plan original quedó en `PLAN-migracion-app-service.md` (raíz del repo, sin commitear).
