import openai
import os

from semantiq.utils import cache_to_disk

openai.api_key = os.environ['OPENAI_API_KEY']


@cache_to_disk
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
