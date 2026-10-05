# LaunchPulse — GTA VI Creator Radar

Public editorial beta in Spanish and English. Search and filter six original briefs, inspect official evidence, save ideas locally, copy or download briefs, and review the product roadmap.

## Run

Requires Node 22 or newer. No third-party dependencies.

```
npm test
npm run build
npm run dev
```

Open http://127.0.0.1:4173. Vercel builds `dist` automatically using `vercel.json`.

## Product status

- Source: https://www.rockstargames.com/VI, reviewed 2026-10-05.
- Editorial angles and suggested titles are original suggestions, not measured trends.
- No invented scores, demand metrics, testimonials or live-data claims.
- Favorites and language are stored only in this browser. Clipboard and Markdown exports include the source and review date.
- Authentication, cloud favorites, paid plans, payments and automatic ingestion are **not active**. The account panel explains that limitation. No email or password collection.
- Creator US$19/month is a proposal, not an available checkout.
- The prepared SQL migration is **not applied**. Before enabling auth, apply and test it in development, confirm RLS isolation and configure verified email delivery.
- `scripts/build.mjs` rejects privileged Supabase keys. Only public configuration may enter the build. No secret belongs in Git or frontend code. Current UI does not use the optional configuration.

## Next implementation gates

1. Connect approved data APIs with restricted credentials, quota controls and explicit source timestamps.
2. Test authentication and user isolation in Supabase; connect cloud favorites.
3. Verify sending domain and support mailbox; add account deletion and operational privacy/terms.
4. Configure merchant-approved test checkout and idempotent webhooks before live payments.
5. Confirm the hosting plan permits the intended commercial use before selling.

No association with Rockstar Games or Take-Two Interactive.
