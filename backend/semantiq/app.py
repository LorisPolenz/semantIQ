import datetime
import logging
import os
from random import randint

from flask import Flask, request, Response, make_response, send_file, jsonify, send_from_directory

from semantiq.evaluate import evaluate
from semantiq.metrics import log_get_puzzle

FRONTEND_STATIC_FOLDER = os.path.join(os.path.dirname(__file__), '../../frontend/build')
app = Flask(__name__, static_folder=FRONTEND_STATIC_FOLDER)


# Define CORS middleware function
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return response


@app.before_request
def debug_request_info():
    try:
        data = None
        # noinspection PyBroadException
        try:
            data = request.get_json()
        except Exception as e:
            pass
        if data is None:
            data = request.form.to_dict()
        if 'ping' not in request.url and 'time_step' not in request.url:
            print(f"{request.url}:{request.headers.get('User-Agent')}: {data}")
    except Exception as e:
        print(f"{e}")


class NoPing(logging.Filter):
    def filter(self, record):
        return (
            'GET /ping HTTP' not in record.getMessage()
            and 'GET /time_step HTTP' not in record.getMessage()
        )


@app.route('/ping')
def ping():
    return 'pong'


START_DATE = datetime.date(2023, 9, 16)


@app.route('/get_puzzle')
def get_puzzle_route():
    days_since_start = (datetime.date.today() - START_DATE).days
    id = days_since_start % 1000
    log_get_puzzle()
    # load file
    return send_file(f'../puzzles/{id}.json')


# POST /evaluate
@app.route('/evaluate', methods=['POST'])
def evaluate_route():
    evaluation_request = request.get_json()
    return evaluate(evaluation_request['puzzle'], evaluation_request['word'])


# Serve React App
@app.route('/')
def serve_index():
    print(FRONTEND_STATIC_FOLDER)
    return send_from_directory(FRONTEND_STATIC_FOLDER, 'index.html')


@app.route('/<path:path>')
def serve(path):
    print(f'{FRONTEND_STATIC_FOLDER}{path}')
    return send_from_directory(FRONTEND_STATIC_FOLDER, path)


app.logger.addFilter(NoPing())
logging.getLogger("werkzeug").addFilter(NoPing())
logging.getLogger('gunicorn.error').addFilter(NoPing())
logging.getLogger('gunicorn.glogging.Logger').addFilter(NoPing())
logging.getLogger('gunicorn.access').addFilter(NoPing())


if __name__ == '__main__':
    app.run()
