-- Create cart table
CREATE TABLE IF NOT EXISTS dine_market_cart (
    cart_id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    product_name VARCHAR(256) NOT NULL,
    product_slug VARCHAR(256) NOT NULL,
    product_type VARCHAR(100) NOT NULL,
    product_image_url TEXT NOT NULL,
    product_size VARCHAR(10) NOT NULL,
    product_quantity INT NOT NULL,
    product_price INT NOT NULL,
    create_time TIMESTAMP DEFAULT NOW()
);

-- Unique constraint to cart table
ALTER TABLE
    dine_market_cart
ADD
    CONSTRAINT unique_cart_entry UNIQUE (
        user_id,
        product_name,
        product_size,
        product_price
    );