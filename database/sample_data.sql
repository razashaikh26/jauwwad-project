-- Sample products with Google Drive images
INSERT INTO products (
    name, description, price, original_price, discount_percentage,
    category_id, brand_id, sku, stock_quantity, specifications,
    images, thumbnail_url, featured, rating, review_count
) VALUES 
(
    'iPhone 15 Pro Max 256GB', 
    'Latest Apple flagship smartphone with A17 Pro chip, titanium design, and advanced camera system',
    134900, 149900, 10,
    1, 1, 'IPHONE15PROMAX256',
    25,
    '{"storage": "256GB", "color": "Natural Titanium", "display": "6.7-inch Super Retina XDR", "processor": "A17 Pro", "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto", "battery": "4441 mAh"}'::jsonb,
    ARRAY[
        'https://drive.google.com/uc?id=YOUR_IPHONE15_IMAGE1_ID',
        'https://drive.google.com/uc?id=YOUR_IPHONE15_IMAGE2_ID',
        'https://drive.google.com/uc?id=YOUR_IPHONE15_IMAGE3_ID'
    ],
    'https://drive.google.com/uc?id=YOUR_IPHONE15_THUMB_ID',
    true, 4.8, 156
),
(
    'Samsung Galaxy S24 Ultra 512GB',
    'Premium Android smartphone with S Pen, 200MP camera, and AI features',
    124999, 139999, 11,
    1, 2, 'GALAXYS24ULTRA512',
    30,
    '{"storage": "512GB", "color": "Titanium Black", "display": "6.8-inch Dynamic AMOLED 2X", "processor": "Snapdragon 8 Gen 3", "camera": "200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto", "battery": "5000 mAh"}'::jsonb,
    ARRAY[
        'https://drive.google.com/uc?id=YOUR_GALAXY_IMAGE1_ID',
        'https://drive.google.com/uc?id=YOUR_GALAXY_IMAGE2_ID',
        'https://drive.google.com/uc?id=YOUR_GALAXY_IMAGE3_ID'
    ],
    'https://drive.google.com/uc?id=YOUR_GALAXY_THUMB_ID',
    true, 4.7, 203
),
(
    'MacBook Pro 14-inch M3 Pro',
    'Professional laptop with M3 Pro chip, Liquid Retina XDR display, and up to 18 hours battery life',
    199900, 219900, 9,
    2, 1, 'MBP14M3PRO512',
    15,
    '{"storage": "512GB SSD", "memory": "18GB Unified Memory", "display": "14.2-inch Liquid Retina XDR", "processor": "Apple M3 Pro", "graphics": "18-core GPU", "battery": "Up to 18 hours"}'::jsonb,
    ARRAY[
        'https://drive.google.com/uc?id=YOUR_MACBOOK_IMAGE1_ID',
        'https://drive.google.com/uc?id=YOUR_MACBOOK_IMAGE2_ID',
        'https://drive.google.com/uc?id=YOUR_MACBOOK_IMAGE3_ID'
    ],
    'https://drive.google.com/uc?id=YOUR_MACBOOK_THUMB_ID',
    true, 4.9, 89
),
(
    'Sony WH-1000XM5 Wireless Headphones',
    'Industry-leading noise canceling wireless headphones with 30-hour battery life',
    29990, 34990, 14,
    3, 3, 'SONYWH1000XM5',
    50,
    '{"type": "Over-ear", "connectivity": "Bluetooth 5.2", "battery": "30 hours", "features": "Active Noise Cancellation, Quick Attention Mode", "weight": "250g"}'::jsonb,
    ARRAY[
        'https://drive.google.com/uc?id=YOUR_SONY_HEADPHONES_IMAGE1_ID',
        'https://drive.google.com/uc?id=YOUR_SONY_HEADPHONES_IMAGE2_ID'
    ],
    'https://drive.google.com/uc?id=YOUR_SONY_HEADPHONES_THUMB_ID',
    false, 4.6, 341
),
(
    'iPad Pro 12.9-inch M2 256GB',
    'Most advanced iPad with M2 chip, Liquid Retina XDR display, and support for Apple Pencil',
    112900, 129900, 13,
    6, 1, 'IPADPRO129M2256',
    20,
    '{"storage": "256GB", "display": "12.9-inch Liquid Retina XDR", "processor": "Apple M2", "connectivity": "Wi-Fi 6E", "camera": "12MP Wide + 10MP Ultra Wide", "battery": "Up to 10 hours"}'::jsonb,
    ARRAY[
        'https://drive.google.com/uc?id=YOUR_IPAD_IMAGE1_ID',
        'https://drive.google.com/uc?id=YOUR_IPAD_IMAGE2_ID'
    ],
    'https://drive.google.com/uc?id=YOUR_IPAD_THUMB_ID',
    true, 4.8, 127
),
(
    'Dell XPS 15 9530 Laptop',
    'Premium Windows laptop with Intel Core i7, OLED display, and professional graphics',
    189999, 209999, 10,
    2, 4, 'DELLXPS159530',
    12,
    '{"processor": "Intel Core i7-13700H", "memory": "32GB DDR5", "storage": "1TB SSD", "display": "15.6-inch OLED 3.5K", "graphics": "NVIDIA GeForce RTX 4060", "battery": "Up to 13 hours"}'::jsonb,
    ARRAY[
        'https://drive.google.com/uc?id=YOUR_DELL_IMAGE1_ID',
        'https://drive.google.com/uc?id=YOUR_DELL_IMAGE2_ID'
    ],
    'https://drive.google.com/uc?id=YOUR_DELL_THUMB_ID',
    false, 4.5, 78
);

-- Update categories with proper image URLs
UPDATE categories SET image_url = 'https://drive.google.com/uc?id=YOUR_SMARTPHONES_CATEGORY_ID' WHERE name = 'Smartphones';
UPDATE categories SET image_url = 'https://drive.google.com/uc?id=YOUR_LAPTOPS_CATEGORY_ID' WHERE name = 'Laptops';
UPDATE categories SET image_url = 'https://drive.google.com/uc?id=YOUR_HEADPHONES_CATEGORY_ID' WHERE name = 'Headphones';
UPDATE categories SET image_url = 'https://drive.google.com/uc?id=YOUR_CAMERAS_CATEGORY_ID' WHERE name = 'Cameras';
UPDATE categories SET image_url = 'https://drive.google.com/uc?id=YOUR_GAMING_CATEGORY_ID' WHERE name = 'Gaming';
UPDATE categories SET image_url = 'https://drive.google.com/uc?id=YOUR_TABLETS_CATEGORY_ID' WHERE name = 'Tablets';
