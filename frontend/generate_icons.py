import os
from PIL import Image, ImageDraw

def create_rounded_mask(size, radius):
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    return mask

def generate_tile(icon_img, size, icon_scale, rounded=True, bg_color="#B6F24A"):
    # Create the tile background
    tile = Image.new('RGBA', (size, size), bg_color)
    
    # Calculate icon size based on scale
    icon_size = int(size * icon_scale)
    
    # Resize icon using LANCZOS
    resized_icon = icon_img.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    
    # Calculate position to center the icon
    pos = ((size - icon_size) // 2, (size - icon_size) // 2)
    
    # Paste icon with alpha compositing
    tile.paste(resized_icon, pos, resized_icon)
    
    if rounded:
        radius = int(size * 0.22)
        mask = create_rounded_mask(size, radius)
        result = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        result.paste(tile, (0, 0), mask)
        return result
    
    return tile

def main():
    base_dir = r"c:\Users\Vishnu suthar\OneDrive\Desktop\portfolio\frontend"
    source_path = os.path.join(base_dir, "public", "brand", "icon-source.png")
    
    icon_source = Image.open(source_path).convert("RGBA")
    
    # 1. /frontend/src/app/icon.png: 512x512, rounded, 78% scale
    app_icon = generate_tile(icon_source, 512, 0.78, rounded=True)
    app_icon.save(os.path.join(base_dir, "src", "app", "icon.png"))
    
    # 2. /frontend/src/app/apple-icon.png: 180x180, square, 70% scale
    apple_icon = generate_tile(icon_source, 180, 0.70, rounded=False)
    apple_icon.convert("RGB").save(os.path.join(base_dir, "src", "app", "apple-icon.png"))
    
    # 3. /frontend/public/icon-192.png (rounded tile versions)
    icon_192 = generate_tile(icon_source, 192, 0.78, rounded=True)
    icon_192.save(os.path.join(base_dir, "public", "icon-192.png"))
    
    # 4. /frontend/public/icon-512.png (rounded tile versions)
    icon_512 = generate_tile(icon_source, 512, 0.78, rounded=True)
    icon_512.save(os.path.join(base_dir, "public", "icon-512.png"))
    
    # 5. /frontend/src/app/favicon.ico: 16, 32 and 48px sizes
    favicon_16 = generate_tile(icon_source, 16, 0.85, rounded=True)
    favicon_32 = generate_tile(icon_source, 32, 0.78, rounded=True)
    favicon_48 = generate_tile(icon_source, 48, 0.78, rounded=True)
    
    favicon_path = os.path.join(base_dir, "src", "app", "favicon.ico")
    favicon_48.save(favicon_path, format="ICO", sizes=[(48, 48), (32, 32), (16, 16)], append_images=[favicon_32, favicon_16])

    print("Successfully generated all icons.")

if __name__ == "__main__":
    main()
