import openai
import os

openai.api_key = os.environ['OPENAI_API_KEY']


def chatgpt(system_prompt: str, **kwargs):
    # seed is just for caching purposes
    messages = [
        {'role': 'system', 'content': system_prompt}
    ]
    res = openai.ChatCompletion.create(
        model='gpt-4',
        messages=messages,
        **kwargs
    )
    choice, = res['choices']
    assert choice['message']['role'] == 'assistant'
    return choice['message']['content']
