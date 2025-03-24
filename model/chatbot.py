import streamlit as st
import ollama
import base64

st.set_page_config(page_title="Mental Health Chatbot")



st.session_state.setdefault('conversation_history',[])

def generate_response(user_input):
    st.session_state['conversation_history'].append({"role":"user", "content":user_input})

    response = ollama.chat(model="llama3:8b", messages=st.session_state['conversation_history'])
    ai_response= response['message']['content']

    st.session_state['conversation_history'].append({"role":"assistant", "content":ai_response})
    return ai_response


st.title("Mental Health Support Agent")

for msg in st.session_state['conversation_history']:
    role= "You" if msg['role'] == "user" else "AI"
    st.markdown(f"{role}:** {msg['content']}")

user_message = st.text_input("How can I help you today?")

if user_message:
    with st.spinner("Thinking....."):
        ai_response = generate_response(user_message)
        st.markdown(f"*AI:* {ai_response}")