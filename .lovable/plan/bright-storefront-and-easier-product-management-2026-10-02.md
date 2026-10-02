# Bright storefront and easier product management

## What will change
- Replace the homepage hero with the supplied bright Pobe's Vault artwork and preserve working shop links over its buttons.
- Show the Pobe's Vault logo for at least 1.5 seconds whenever navigation changes the page.
- Make bright appearance the first-visit default while preserving each returning visitor's saved choice.
- Show only product image, name, and price in the New Arrivals and Best Sellers listings.
- Replace unavailable-product wording with “Restocking soon.”
- Update cart, checkout, delivery, and order messages to: “Delivery: 30-50 GHS in Accra, 60-80 GHS outside Accra. Pay on delivery.”
- Let Store Manager users select one or more product photos from their phone gallery, preview them, remove selections, and save them with the product.

## Technical details
- Store the supplied hero through the app’s image asset flow.
- Use the existing private product-image library with admin-only access; uploaded public catalogue photos receive long-lived display links.
- Validate image type and 10 MB maximum size before upload.
- Keep current URL-entry support so existing product images and edits continue working.
- Verify the phone layout, navigation delay, product listings, and authenticated product photo upload flow.
