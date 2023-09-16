import logging
from flask import Flask, request, Response, make_response, send_file, jsonify

from backend.semantiq.evaluate import evaluate

app = Flask(__name__)


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


@app.route('/')
def hello_world():
    return 'version 001'


@app.route('/ping')
def ping():
    return 'pong'


@app.route('/get_puzzle')
def get_puzzle_route():
    return jsonify({
        'groupPos': ['happy', 'jump', 'table', 'dog'],
        'groupNeg': ['apple', 'moon', 'blue', 'smile'],
    })


# POST /evaluate
@app.route('/evaluate', methods=['POST'])
def evaluate_route():
    evaluation_request = request.get_json()
    return evaluate(evaluation_request['puzzle'], evaluation_request['word'])


app.logger.addFilter(NoPing())
logging.getLogger("werkzeug").addFilter(NoPing())
logging.getLogger('gunicorn.error').addFilter(NoPing())
logging.getLogger('gunicorn.glogging.Logger').addFilter(NoPing())
logging.getLogger('gunicorn.access').addFilter(NoPing())


if __name__ == '__main__':
    app.run()
