from langchain_community.document_loaders import PyPDFLoader
from langchain_cohere import ChatCohere
import os

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv, find_dotenv


def chat_with_pdf(file_path, question):
    # Load the PDF file
    loader = PyPDFLoader(file_path)
    docs = loader.load()

    # Load the AI model (assuming COHERE_API_KEY is set in .env file)
    load_dotenv(find_dotenv())
    os.environ["COHERE_API_KEY"] = os.getenv("COHERE_API_KEY")
    llm = ChatCohere(model="command-r")

    # Split documents and create retriever
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())
    retriever = vectorstore.as_retriever()

    # Create RAG chain
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

    # Ensure 'question' is a string and invoke RAG chain
    results = rag_chain.invoke({"input": question})

    print(f'Result: {results}')

    # Extract answer, page content, and metadata from results
    answer = results["answer"]
    page_context_list = [doc.page_content for doc in results['context']]
    page_context_metadata = [doc.metadata for doc in results['context']]
    
    return answer, page_context_list, page_context_metadata
