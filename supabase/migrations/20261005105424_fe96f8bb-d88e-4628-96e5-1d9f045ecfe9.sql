INSERT INTO public.products (slug, name, brand, category, price, images, sizes, colours, in_stock, badges, added_index, description)
VALUES (
  'asics-gel-nyc-p134',
  'Gel-NYC / P134',
  'Asics',
  'Shoes',
  250,
  ARRAY[
    '/__l5e/assets-v1/2c40f623-4f2c-4719-8673-84a8b8451f08/asics-gel-nyc-cream-grey.png',
    '/__l5e/assets-v1/978fd0a4-8ad2-406b-9f60-520d0ce948ef/asics-gel-nyc-silver-grey.png',
    '/__l5e/assets-v1/2d6e1d5d-8999-489f-bf1f-d839350c50a9/asics-gel-nyc-sky-blue.png',
    '/__l5e/assets-v1/88ac5eb7-da2a-48d6-a3bb-c51099e7c432/asics-gel-nyc-black-silver.png'
  ]::text[],
  ARRAY['40', '41', '42', '43', '44']::text[],
  ARRAY['Cream / Grey', 'Silver / Grey', 'Sky Blue', 'Black / Silver']::text[],
  true,
  ARRAY['NEW']::text[],
  128,
  'ASICS Gel-NYC / P134 runner with layered mesh and synthetic overlays, available in four colourways with cushioned everyday comfort.'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  sizes = EXCLUDED.sizes,
  colours = EXCLUDED.colours,
  in_stock = EXCLUDED.in_stock,
  badges = EXCLUDED.badges,
  added_index = EXCLUDED.added_index,
  description = EXCLUDED.description,
  updated_at = now();