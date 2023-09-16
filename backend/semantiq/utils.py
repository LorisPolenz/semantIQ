import os
import hashlib
import shelve
import pickle

# The directory where the cache files will be stored
# This should be set to a directory that is not in the project directory
# set relative to this file
CACHE_DIR = os.path.dirname(os.path.abspath(__file__)) + '/../cache'


def cache_to_disk(func, file_suffix=''):
    print("calling debugged cache to disk")
    def wrapper(*args, **kwargs):
        # Serialize arguments using pickle
        serialized_args = pickle.dumps((args, kwargs))

        # Create a hash of the serialized arguments
        hashed_args = hashlib.sha1(serialized_args).hexdigest()

        file_name = f'{func.__module__}__{func.__qualname__}{file_suffix}'
        os.makedirs(CACHE_DIR, exist_ok=True)
        # Open the shelve cache
        with shelve.open(CACHE_DIR+'/'+file_name) as cache:
            # Check if the cache key exists, if so, load the cached result
            if hashed_args in cache:
                return cache[hashed_args]

            # If the cache key does not exist, call the function and store the result
            result = func(*args, **kwargs)
            cache[hashed_args] = result

        return result

    return wrapper
