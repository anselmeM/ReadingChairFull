import re

with open('index.html', 'rb') as f:
    content = f.read().decode('utf-8')

# Fix double spaces in img tags
new_content = re.sub(r'(<img\s+[^>]*?)\s{2,}(width=)', r'\1 \2', content)

with open('index.html', 'wb') as f:
    f.write(new_content.encode('utf-8'))
