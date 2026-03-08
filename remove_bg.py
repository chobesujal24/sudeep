import os
from PIL import Image

def remove_blue_bg(input_path, output_path):
    # Open the image
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    newData = []
    
    for item in datas:
        # Check if the pixel is predominantly blue
        # R = item[0], G = item[1], B = item[2], A = item[3]
        if item[2] > 120 and item[0] < 100 and item[1] < 150:
            # Replace blue with transparency
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    import sys
    remove_blue_bg(sys.argv[1], sys.argv[2])
