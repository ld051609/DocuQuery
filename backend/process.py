from langchain_community.document_loaders import PyPDFLoader
from langchain_cohere import ChatCohere
import getpass
import os

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter


from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv, find_dotenv


# Load the PDF file
file_path = "./nke-10k-2023.pdf"
loader = PyPDFLoader(file_path)

docs = loader.load()

print(len(docs))
print(docs[0].page_content[0:100])
print(docs[0].metadata)


# Load the AI model
# os.environ["COHERE_API_KEY"] = getpass.getpass()
load_dotenv(find_dotenv())

os.environ["COHERE_API_KEY"] = os.getenv("COHERE_API_KEY")
llm = ChatCohere(model="command-r")

# Using a text splitter, you'll split your loaded documents into smaller documents 
# that can more easily fit into an LLM's context window, then load them into a vector store. 
# You can then create a retriever from the vector store for use in our RAG chain
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())
retriever = vectorstore.as_retriever()

# Create a RAG chain
system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

results = rag_chain.invoke({"input": "What was Nike's revenue in 2023?"})

print(results)
print(results["context"][0].page_content)
print(results["context"][0].metadata)