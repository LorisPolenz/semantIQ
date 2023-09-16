import json
import os
from functools import lru_cache

import numpy as np
from typing import List, Dict

import openai


openai.api_key = os.getenv("OPENAI_API_KEY")


# Up by 1 dir compared to current folder then embeddings.json
EMBEDDINGS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'embeddings.json')


def get_embedding(texts: List[str]) -> np.array:
    texts = [text.replace("\n", " ") for text in texts]
    data = openai.Embedding.create(input=texts, model="text-embedding-ada-002")['data']
    return [d['embedding'] for d in data]


def save_embeddings_to_disk(words: List[str], file_path: str):
    embeddings = get_embedding(words)
    word_embedding_dict = dict(zip(words, embeddings))
    with open(file_path, 'w') as f:
        json.dump(word_embedding_dict, f)


def load_embeddings_from_disk(file_path: str) -> Dict[str, np.array]:
    with open(file_path, 'r') as f:
        word_embedding_dict = json.load(f)
    # Convert lists back to numpy arrays
    for word, emb in word_embedding_dict.items():
        word_embedding_dict[word] = np.array(emb)
    return word_embedding_dict


@lru_cache(maxsize=None)
def load_default_embeddings() -> Dict[str, np.array]:
    return load_embeddings_from_disk(EMBEDDINGS_FILE)


def embedding(word: str) -> np.array:
    return load_default_embeddings()[word]


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
