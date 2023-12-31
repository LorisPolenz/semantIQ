import os

WORDS_FILE = os.path.join(os.path.dirname(__file__), '../assets/english_words.csv')


def validate_user_input(input_str: str) -> bool:

    if len(input_str) < 1:
        return False

    with open(WORDS_FILE, 'r') as f:
        keywords = [k.lower() for k in f.read().split('\n')]

    if input_str.lower() in keywords:
        return True
    else:
        return False


def test_validation():
    for element in ["obfuscate", "ephemeral", "quixotic", "serendipity", "ubiquitous", "vicarious", "effervescent", "peregrination", "sesquipedalian", "perspicacious", "cacophony", "quagmire", "ephemeral", "serendipity", "ubiquitous", "vicarious", "effervescent", "peregrination"]:
        print(f"{element}: {validate_user_input(element)}")
