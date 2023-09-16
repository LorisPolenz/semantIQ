import json
from random import randint

from semantiq.embeddings import cosine_similarity, embedding, get_embedding
from semantiq.evaluate import evaluate_with_gpt


def get_random_puzzle():
    i = randint(0, 99)
    with open(f'../puzzles/{i}.json') as f:
        return json.load(f)


# def evaluation_gpt(puzzle: dict, word):
#     evaluate_with_gpt(puzzle, word)


def evaluation_similarity(puzzle: dict, word):
    group_neg = puzzle['groupNeg']
    group_pos = puzzle['groupPos']
    all_words = group_neg + group_pos
    embedding_word = get_embedding([word])[0]
    similarities = []
    for w in all_words:
        similarities.append((w, cosine_similarity(embedding(w), embedding_word)))
    similarities.sort(key=lambda x: x[1], reverse=True)
    # print from most similar to least similar
    for w, sim in similarities:
        print(f'{w} {sim}')


def main():
    for _ in range(10):
        puzzle = get_random_puzzle()
        for _ in range(3):
            print(f'Puzzle: {puzzle}')
            word = input('Word: ')
            print('### Gpt:')
            print(evaluate_with_gpt(puzzle, word))
            print('### Similarity:')
            evaluation_similarity(puzzle, word)
            print('---')


if __name__ == '__main__':
    main()
