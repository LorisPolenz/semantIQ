import random
from pprint import pprint
from typing import List

from flask import jsonify
from semantiq.validate import validate_user_input
from semantiq.metrics import log_evaluate, log_get_puzzle
from semantiq.chatgpt import chatgpt

PROMPT_EVALUATE = '''
please list the following words starting from the most relevant to least relevant to the word "{}"

Words to list: {} 

Please output only the words separated by comma, nothing before

'''


def evaluate_with_gpt(puzzle, word):
    group_neg = puzzle['groupNeg']
    group_pos = puzzle['groupPos']

    all_w = group_neg + group_pos
    rg = random.Random(0)
    rg.shuffle(all_w)

    prompt = PROMPT_EVALUATE.format(word, all_w)

    return chatgpt(prompt, temperature=0.0).strip().split(', ')


def evaluate(puzzle, word):
    word = word.lower()
    if not validate_user_input(word):
        log_evaluate(word, None, False)
        return jsonify({'error': 'Invalid word'})
    group_pos = puzzle['groupPos']

    res = evaluate_with_gpt(puzzle, word)
    score = sum(r in group_pos for r in res[:3])
    log_evaluate(word, score, True)

    return jsonify({'score': score, 'topWords': res[:3]})
