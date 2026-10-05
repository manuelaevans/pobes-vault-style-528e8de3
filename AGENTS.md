<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Checkout records unpaid orders as `pending`; payment is confirmed manually before the admin drafts a receipt email, because online Paystack collection is temporarily disabled.
- Product gallery uploads use the private `product-images` library with admin-only access and long-lived signed display URLs, because public storage is disabled for this workspace.
- Catalogue products are database-first with a matching static fallback, so the storefront remains usable if catalogue loading fails.
