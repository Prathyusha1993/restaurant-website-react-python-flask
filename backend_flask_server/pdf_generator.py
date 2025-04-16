from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
from main import db
from models import MenuItem

def generate_menu_pdf():
    try:
        items = MenuItem.query.all()
        output_path= os.path.join(os.getcwd(), 'static', 'downloads', 'menu.pdf')
        c = canvas.Canvas(output_path, pagesize=letter)
        width, height = letter
        y = height - 50

        c.setFont('Helvetica-Bold', 16)
        c.drawCentredString(width / 2, y, "Aha Biryani's Restaurant Menu")
        y -= 40

        c.setFont('Helvetica', 12)
        current_category = None

        for item in items:
            if item.category != current_category:
                current_category = item.category
                y -= 20
                c.setFont('Helvetica-Bold', 14)
                c.drawString(50, y, current_category.title())
                y -= 20
                c.setFont('Helvetica', 12)

            item_line = f'{item.name} - ₹{item.price}'
            y -= 15
            c.drawString(60, y, item_line)

            if item.description:
                y -= 13
                c.setFont('Helvetica-Oblique', 10)
                c.drawString(70, y, f'{item.description}')
                c.setFont('Helvetica', 12)

            info = []
            if item.veg:
                info.append('Veg')
            else:
                info.append('Non-Veg')
            if item.spicy:
                info.append('Spicy')
            
            if info:
                y -= 13
                c.setFont('Helvetica-Oblique', 10)
                c.drawString(70, y, f"({' • '.join(info)})")
                c.setFont('Helvetica', 12)
            
            y -= 20
            if y < 100:
                c.showPage()
                y = height - 50
                c.setFont('Helvetica', 12)
        
        c.save()
        print('PDF Updated')
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")