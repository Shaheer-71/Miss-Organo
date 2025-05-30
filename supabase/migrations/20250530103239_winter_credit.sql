-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    discount INTEGER DEFAULT 0,
    images TEXT[] NOT NULL,
    category VARCHAR(100) NOT NULL,
    rating INTEGER DEFAULT 5,
    reviews INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    ingredients TEXT[] NOT NULL,
    benefits TEXT[] NOT NULL,
    how_to_use TEXT NOT NULL,
    herbs_used TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address JSONB NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create order_items table
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create admin user and sample data
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'admin@missorgano.com',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW()
);

-- Insert sample products
INSERT INTO products (name, description, price, images, category, ingredients, benefits, how_to_use, herbs_used, is_featured, is_best_seller, is_new) VALUES
('Radiance Facial Serum', 'Our bestselling facial serum packed with organic vitamin C and hyaluronic acid.', 48.00, ARRAY['https://images.pexels.com/photos/6621349/pexels-photo-6621349.jpeg'], 'Skincare', 
ARRAY['Organic Aloe Vera', 'Hyaluronic Acid', 'Vitamin C', 'Jojoba Oil'], 
ARRAY['Brightens skin tone', 'Reduces fine lines', 'Deeply hydrates'], 
'Apply 3-4 drops to clean skin morning and evening.', 
ARRAY['Rosehip', 'Chamomile'], true, true, false),

('Hydrating Rose Clay Mask', 'Gentle clay mask with rose petals and organic honey.', 38.00, ARRAY['https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg'], 'Skincare',
ARRAY['Pink Kaolin Clay', 'Rose Petal Powder', 'Organic Honey', 'Aloe Vera'],
ARRAY['Detoxifies pores', 'Balances oil production', 'Soothes redness'],
'Apply an even layer to clean, damp skin. Leave for 10-15 minutes.',
ARRAY['Rose', 'Calendula'], false, true, false),

('Nourishing Lip Balm Trio', 'Set of three luxurious lip balms with organic shea butter.', 24.00, ARRAY['https://images.pexels.com/photos/6690933/pexels-photo-6690933.jpeg'], 'Lip Care',
ARRAY['Organic Shea Butter', 'Beeswax', 'Coconut Oil', 'Vitamin E'],
ARRAY['Deeply moisturizes', 'Prevents chapping', 'Natural UV protection'],
'Apply to lips as needed throughout the day.',
ARRAY['Mint', 'Vanilla Bean'], false, false, true),

('Botanical Hair Repair Oil', 'Restorative hair oil blend with argan and jojoba.', 36.00, ARRAY['https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg'], 'Hair Care',
ARRAY['Argan Oil', 'Jojoba Oil', 'Rosemary Essential Oil', 'Vitamin E'],
ARRAY['Repairs damaged ends', 'Adds natural shine', 'Strengthens hair'],
'Apply a few drops to damp or dry hair, focusing on ends.',
ARRAY['Rosemary', 'Lavender'], true, false, false),

('Rejuvenating Eye Cream', 'Gentle yet effective eye cream with caffeine and peptides.', 42.00, ARRAY['https://images.pexels.com/photos/7262997/pexels-photo-7262997.jpeg'], 'Skincare',
ARRAY['Peptide Complex', 'Caffeine', 'Hyaluronic Acid', 'Green Tea Extract'],
ARRAY['Reduces dark circles', 'Minimizes fine lines', 'Decreases puffiness'],
'Gently pat around orbital bone morning and evening.',
ARRAY['Green Tea', 'Cucumber'], true, true, false);

-- Insert sample orders
INSERT INTO orders (user_id, customer_name, email, status, total_amount, shipping_address, payment_method) VALUES
((SELECT id FROM auth.users WHERE email = 'admin@missorgano.com'), 'Emma Johnson', 'emma@example.com', 'completed', 96.00, 
'{"street": "123 Nature St", "city": "Green City", "state": "GC", "zip_code": "12345", "country": "United States"}', 'cod'),

((SELECT id FROM auth.users WHERE email = 'admin@missorgano.com'), 'Sophie Williams', 'sophie@example.com', 'processing', 78.00,
'{"street": "456 Organic Ave", "city": "Eco Town", "state": "ET", "zip_code": "67890", "country": "United States"}', 'card'),

((SELECT id FROM auth.users WHERE email = 'admin@missorgano.com'), 'Michael Chen', 'michael@example.com', 'pending', 124.00,
'{"street": "789 Herbal Lane", "city": "Nature Valley", "state": "NV", "zip_code": "13579", "country": "United States"}', 'cod');

-- Insert order items for the sample orders
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
((SELECT id FROM orders WHERE customer_name = 'Emma Johnson'), 1, 2, 48.00),
((SELECT id FROM orders WHERE customer_name = 'Sophie Williams'), 2, 1, 38.00),
((SELECT id FROM orders WHERE customer_name = 'Sophie Williams'), 3, 1, 24.00),
((SELECT id FROM orders WHERE customer_name = 'Michael Chen'), 4, 2, 36.00),
((SELECT id FROM orders WHERE customer_name = 'Michael Chen'), 5, 1, 42.00);