import json
import os

with open('data/products_with_images.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

ts_products = []

for p in products:
    title = p.get('title', '').strip()
    slug = p.get('slug', '')
    img = p.get('local_image', '')
    p_id = p.get('id')

    # Categorization logic
    title_lower = title.lower()
    
    if any(k in title_lower for k in [
        'смазка', 'вода', 'жидкость', 'изолента', 'маски', 'перчатки', 
        'светильник', 'лампа', 'запчасти', 'нож', 'решетк', 'автомат', 
        'контактор', 'манжет', 'сальник', 'подшипник', 'стекл', 'тэн', 'противн'
    ]):
        category = 'parts'
        category_name = 'Запчасти и расходники'
        badge = 'В наличии / Под заказ'
    elif any(k in title_lower for k in [
        'погрузчик', 'платформ', 'колесо', 'mecanum', 'транспортер', 'тележка для противней', 'стеллажная тележка'
    ]):
        category = 'warehouse'
        category_name = 'Складская техника'
        badge = 'Сервис и продажа'
    else:
        category = 'food'
        category_name = 'Пищевое оборудование'
        badge = 'Сервис и продажа'

    # Auto generate a crisp B2B description
    if category == 'parts':
        desc = f"Оригинальные комплектующие и совместимые аналоги для промышленного оборудования. Быстрая отгрузка со склада в Краснодаре или подбор по вашему артикулу."
    elif category == 'warehouse':
        desc = f"Надежная подъемно-транспортная техника для складов и логистических комплексов. Полная предпродажная подготовка, гарантия и сервисное сопровождение."
    else:
        desc = f"Профессиональное оборудование для пекарен, кондитерских цехов, ресторанов и пищевых производств. Монтаж, пусконаладка и регулярное ТО."

    ts_products.append({
        'id': p_id,
        'title': title,
        'slug': slug,
        'category': category,
        'categoryName': category_name,
        'badge': badge,
        'image': img,
        'description': desc
    })

os.makedirs('src/data', exist_ok=True)
with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write("// Автоматически сгенерированная база 74 позиций оборудования и запчастей\n")
    f.write("export interface ProductItem {\n")
    f.write("  id: number;\n")
    f.write("  title: string;\n")
    f.write("  slug: string;\n")
    f.write("  category: 'parts' | 'food' | 'warehouse';\n")
    f.write("  categoryName: string;\n")
    f.write("  badge: string;\n")
    f.write("  image: string;\n")
    f.write("  description: string;\n")
    f.write("}\n\n")
    f.write("export const PRODUCTS: ProductItem[] = ")
    f.write(json.dumps(ts_products, ensure_ascii=False, indent=2))
    f.write(";\n")

print(f"Generated src/data/products.ts with {len(ts_products)} items.")
