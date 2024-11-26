import PIL.Image
import google.generativeai as genai

genai.configure(api_key="AIzaSyBq2nc05mUMNpuyQMsW-j69L7Qtl-Chf0A")
model = genai.GenerativeModel("gemini-1.5-flash")
letra = PIL.Image.open("letra.png")
response = model.generate_content(["Qual letra é essa ?", letra])
print(response.text)

