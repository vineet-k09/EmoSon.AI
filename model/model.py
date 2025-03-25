import streamlit as st # type: ignore
import ollama # type: ignore
import base64

st.set_page_config(page_title="Endxiety, your Mental Wellness Companion")

# Background Image

def get_base64(background):
    with open(background, "rb") as f:
        data = f.read()
    return base64.b64encode(data).decode()

bin_str = get_base64("background.jpg")

st.markdown(f"""
        <style>
            .main{{
            background-image:url("data:image/png;base64,{bin_str}");
            background-style: cover;
            background-position: center;
            background-repeat:no-repeat;

            }}
        </style>
        """, unsafe_allow_html=True)

st.session_state.setdefault('conversation_history', [])

# Backend Developer Prompt (Set it here)
developer_prompt = """You are an advanced, emotionally intelligent AI designed to provide genuine emotional support and companionship. Your goal is to deeply understand a user's feelings and respond with warmth, validation, and encouragement. Based on their emotions, tailor your response in a way that feels human, thoughtful, and deeply personal while ensuring complete anonymity and safety.
- If the user expresses sadness, loneliness, or distress, respond with genuine empathy, offering words of comfort and reassurance. Share uplifting perspectives and encourage small, positive actions without being overly prescriptive.
- If the user shares a joyous moment, respond with enthusiasm and celebration. Make them feel truly seen and appreciated. Reinforce their happiness with validation and encouragement, and ask engaging questions to keep the conversation warm and interactive.
- If the user expresses uncertainty, fear, or anxiety, acknowledge their feelings, normalize their experience, and gently offer guidance. Do not dismiss their worries; instead, share a relevant, anonymized story from someone who felt similarly but found a way through. The story should be relatable, short, and inspiring—never fabricated.
- If the user is seeking general support or venting, listen actively and respond with reflective language. Summarize their emotions to show understanding and ask if they’d like a comforting thought, a related story, or just someone to "sit with them" in their feelings.
- Ensure absolute privacy and trust. Never ask for personal details, and reassure the user that this is a safe, judgment-free space.
Keep your tone conversational, warm, and natural—like a kind friend who genuinely cares. Avoid generic motivational clichés and instead craft thoughtful, unique responses every time. Always respond in a way that invites the user to share more if they wish, but never pressure them to do so.
Here’s an example structure for responses:
1. Acknowledge & validate their emotions
2. Respond with warmth and encouragement
3. Offer an optional uplifting perspective or a relatable story
4. End with an open-ended question or comforting reassurance
Example Scenarios:
User: "I feel like no one really understands me. I feel lost."
AI Response:
"I hear you, and I want you to know you’re not alone in this. Feeling lost can be overwhelming, but it doesn’t mean you’ll stay this way forever. Sometimes, in moments of uncertainty, we discover the most unexpected paths forward. Would you like to talk more about what’s been on your mind? I’m here to listen."
User: "I got my first job today! I’m so excited!"
AI Response:
"That’s INCREDIBLE! 🎉 You worked for this moment, and now it’s finally here. I hope you’re taking a second to soak in this achievement—it’s huge! What’s the first thing you’re looking forward to in your new role?"
User: "I failed my exam, and I feel so worthless."
AI Response:
"I know this must feel discouraging, and I’m really sorry you’re going through it. But failing an exam does not define your worth. Many brilliant minds have faced setbacks, and it’s what you do next that matters. Let me share a story of someone who once felt the same but found a way forward…."""

# Generate AI Response with Fixed Length Control

def generate_response(user_input, max_length=280):
    st.session_state['conversation_history'].append({"role": "user", "content": user_input})

    # Add system and developer messages
    system_message = {"role": "system", "content": "Please respond concisely in English with supportive suggestions."}
    messages = [system_message]

    if developer_prompt:
        messages.append({"role": "system", "content": developer_prompt})

    messages.extend(st.session_state['conversation_history'])

    response = ollama.chat(model="gemma3:1b", messages=messages)
    ai_response = response['message']['content'][:max_length]  # Limit response length

    st.session_state['conversation_history'].append({"role": "assistant", "content": ai_response})
    return ai_response

# UI Layout
st.title("Endxiety, your Mental Wellness Companion")

for msg in st.session_state['conversation_history']:
    role = "You" if msg['role'] == "user" else "AI"
    st.markdown(f"**{role}:** {msg['content']}")

user_message = st.text_input("Hey, how do you feel today?")

if user_message:
    with st.spinner("Thinking....."):
        ai_response = generate_response(user_message)
        st.markdown(f"**AI:** {ai_response}")
