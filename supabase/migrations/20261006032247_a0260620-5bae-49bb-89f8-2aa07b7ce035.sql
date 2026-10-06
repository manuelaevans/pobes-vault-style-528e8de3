ALTER TABLE public.products
ADD COLUMN related_slugs text[] NOT NULL DEFAULT '{}'::text[];