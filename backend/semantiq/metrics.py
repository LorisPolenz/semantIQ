from elasticsearch import Elasticsearch, helpers
import os
from datetime import datetime
import pytz

try:
    es = Elasticsearch(
        cloud_id=os.getenv("ELASTIC_CLOUD_ID"),
        basic_auth=(os.getenv("ELASTIC_USER"), os.getenv("ELASTIC_PASSWORD"))
    )
except:
    es = None

INDEX_NAME = 'semantiq_logs'


def log_to_elastic(document: dict, index_name: str) -> None:

    document['@timestamp'] = datetime.now(tz=pytz.timezone('Europe/Zurich'))

    if es is None:
        print("elastic not configured correctly")
        return
    es.index(
        index=index_name,
        document=document
    )

    print("logged to elastic")


def log_get_puzzle() -> None:
    log_to_elastic(
        document={
            'endpoint': 'get_puzzle'
        },
        index_name=INDEX_NAME
    )


def log_evaluate(entered_word: str, scores, input_was_valid: bool) -> None:
    log_to_elastic(
        document={
            'entered_word': entered_word,
            'score': scores,
            'input_was_valid': input_was_valid,
            'endpoint': 'evaluate'
        },
        index_name=INDEX_NAME
    )


# log_get_puzzle()
# log_get_puzzle()
# log_get_puzzle()
# log_get_puzzle()
# log_get_puzzle()
# log_get_puzzle()
# log_evaluate('apple', 3/4)
# log_evaluate('apple', 3/4)
# log_evaluate('apple', 3/4)
# log_evaluate('apple', 3/4)
# log_evaluate('apple', 3/4)
# log_evaluate('apple', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('coyzthing', 3/4)
# log_evaluate('apple', 3/4)
# log_evaluate('google', 1/4)
# log_evaluate('google', 1/4)
# log_evaluate('google', 1/4)
# log_evaluate('google', 1/4)
# log_evaluate('google', 1/4)
# log_evaluate('google', 1/4)
# log_evaluate('microsoft', 2/4)
# log_evaluate('microsoft', 2/4)
# log_evaluate('microsoft', 2/4)
# log_evaluate('microsoft', 2/4)
# log_evaluate('microsoft', 2/4)
# log_evaluate('microhard', 2/4)
# log_evaluate('microhard', 2/4)
# log_evaluate('microhard', 2/4)
# log_evaluate('microhard', 2/4)
# log_evaluate('microhard', 2/4)
