from flask import Flask, render_template, request, jsonify, make_response
import json
from datetime import datetime

app = Flask(__name__)

with open('static/translations.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)


@app.route('/')
def index():
    lang = request.cookies.get('lang', 'ru')
    theme = request.cookies.get('theme', 'light')

    if not theme:
        hour = datetime.now().hour
        theme = 'dark' if hour < 6 or hour >= 20 else 'light'

    return render_template(
        'index.html',
        translations=translations[lang],
        lang=lang,
        theme=theme
    )


@app.route('/switch-language', methods=['POST'])
def switch_language():
    lang = request.json.get('lang', 'ru')
    response = make_response(jsonify({'status': 'success'}))
    response.set_cookie('lang', lang, max_age=30 * 24 * 60 * 60)
    return response


@app.route('/switch-theme', methods=['POST'])
def switch_theme():
    theme = request.json.get('theme', 'light')
    response = make_response(jsonify({'status': 'success'}))
    response.set_cookie('theme', theme, max_age=30 * 24 * 60 * 60)
    return response


if __name__ == '__main__':
    app.run(debug=True)