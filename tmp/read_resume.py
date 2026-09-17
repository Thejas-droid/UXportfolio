import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root / 'tmp/pdf-tools'))
import pymupdf

doc = pymupdf.open(r'C:\Users\Thejas\Downloads\RESUME (1).pdf')
output = root / 'tmp/pdfs'
output.mkdir(parents=True, exist_ok=True)
for i, page in enumerate(doc):
    print('PAGE', i + 1)
    print(page.get_text().encode('ascii', 'backslashreplace').decode())
    print('LINKS', page.get_links())
    page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save(output / f'resume-{i+1}.png')
print('Rendered', len(doc), 'pages')
