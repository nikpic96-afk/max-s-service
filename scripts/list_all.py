import json

with open('data/products_clean.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Total: {len(products)} products")
for i, p in enumerate(products, 1):
    img_status = "has image" if p.get('image') else "no image"
    print(f"{i:2d}. {p['title']} [{img_status}]")
