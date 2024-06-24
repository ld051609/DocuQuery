from langchain_community.document import PyPDFLoader


file_path = ''
loader = PyPDFLoader(file_path)

docs = loader.load()
