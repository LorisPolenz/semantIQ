import os

WORDS_FILE = os.path.join(os.path.dirname(__file__), '../assets/english_words.csv')


def validate_user_input(input_str: str) -> bool:
    with open(WORDS_FILE, 'r') as f:
        keywords = f.read().split('\n')

    if input_str in keywords:
        return True
    else:
        return False


def test_validation():
    for element in ["obfuscate", "ephemeral", "quixotic", "serendipity", "ubiquitous", "vicarious", "effervescent", "peregrination", "sesquipedalian", "perspicacious", "cacophony", "quagmire", "ephemeral", "serendipity", "ubiquitous", "vicarious", "effervescent", "peregrination"]:
        print(f"{element}: {validate_user_input(element)}")