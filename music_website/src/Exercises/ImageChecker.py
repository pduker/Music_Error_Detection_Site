import os
from PIL import Image

assignmentsDirectory = f"{os.getcwd()}\\music_website\\src\\Exercises"

if __name__ == "__main__":
    print("Start")

    print(f"assignmentsDirectory = {assignmentsDirectory}\n")

    for path, subdirs, files in os.walk(assignmentsDirectory):
        for name in files:
            ## Check for display.png
            if name == "display.png":
                pathToImage = f"{path}\\{name}"
                display2Path = f"{path}\\display2.png"
                ## Check the image width of display.png and warn if it isn't high quality
                image = Image.open(pathToImage)
                width, height = image.size
                if width < 1200:
                    print(
                        f"Warning: display.png at this path is low quality (width: {width} height: {height}): {pathToImage}"
                    )
                ## Check if display2.png exists
                if os.path.exists(display2Path):
                    print(f"display2.png already exists: {display2Path}")
                ## If display2.png doesn't exist, resize display.png and save it as display2.png
                else:
                    print("display2.png doesn't exist, creating it: {display2Path}")
                    basewidth = 1220
                    wpercent = basewidth / float(image.size[0])
                    hsize = int((float(image.size[1]) * float(wpercent)))
                    image = image.resize((basewidth, hsize), Image.ANTIALIAS)
                    image.save(display2Path)
                    print("Done")

                print()


print("\nEnd")
