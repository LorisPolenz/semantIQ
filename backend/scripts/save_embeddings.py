from backend.semantiq.embeddings import save_embeddings_to_disk, EMBEDDINGS_FILE
from backend.semantiq.gen_random_words import get_all_words


def main():
    all_words = get_all_words()
    save_embeddings_to_disk(all_words, EMBEDDINGS_FILE)


if __name__ == '__main__':
    main()
