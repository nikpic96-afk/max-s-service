import json
import re
import os

data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
raw_products_file = os.path.join(data_dir, 'products_raw.json')
raw_pages_file = os.path.join(data_dir, 'pages_raw.json')

with open(raw_products_file, 'r', encoding='utf-8') as f:
    products = json.load(f)

with open(raw_pages_file, 'r', encoding='utf-8') as f:
    pages = json.load(f)

clean_products = []
for p in products:
    title = p.get('title', {}).get('rendered', '').strip()
    slug = p.get('slug', '')
    content = p.get('content', {}).get('rendered', '')
    excerpt = p.get('excerpt', {}).get('rendered', '')
    clean_desc = re.sub('<[^<]+?>', '', content).strip()
    
    # Try to extract image url from yoast_head if available
    yoast = p.get('yoast_head', '')
    img_match = re.search(r'property="og:image"\s+content="([^"]+)"', yoast)
    img_url = img_match.group(1) if img_match else ''

    clean_products.append({
        'id': p.get('id'),
        'title': title,
        'slug': slug,
        'description': clean_desc,
        'image': img_url,
        'link': p.get('link')
    })

clean_pages = []
for pg in pages:
    t = pg.get('title', {}).get('rendered', '').strip()
    slug = pg.get('slug', '')
    content = pg.get('content', {}).get('rendered', '')
    clean_text = re.sub('<[^<]+?>', '', content).strip()
    clean_pages.append({
        'id': pg.get('id'),
        'title': t,
        'slug': slug,
        'content_snippet': clean_text[:200]
    })

with open(os.path.join(data_dir, 'products_clean.json'), 'w', encoding='utf-8') as f:
    json.dump(clean_products, f, ensure_ascii=False, indent=2)

with open(os.path.join(data_dir, 'pages_clean.json'), 'w', encoding='utf-8') as f:
    json.dump(clean_pages, f, ensure_ascii=False, indent=2)

print(f"Successfully processed {len(clean_products)} products and {len(clean_pages)} pages.")
print("\nProduct categories/types represented:")
for cp in clean_products[:15]:
    print(f"- {cp['title']}")

print("\nPages list:")
for pg in clean_pages:
    print(f"- {pg['title']} (/{pg['slug']})")
