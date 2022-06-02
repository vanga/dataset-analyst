# export FLASK_APP=server.py
# flask run --host="0.0.0.0" --port=80
import time
from random import randint, choice
import os, sys, json, simplejson
import numpy as np
import argparse

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from flask import send_from_directory


import pandas as pd

app = Flask(__name__)
CORS(app)

src_meta_file = ""
img_dir = ""
df = pd.read_csv(src_meta_file).sort_values(by=["pose_prediction","clip_prediction"], ascending=False)
headers = list(df)

def searchHandler(req_body):
  p_lte = req_body.get('posePLTE', 1)
  p_gte = req_body['posePGTE']
  c_lte = req_body['clipPLTE']
  c_gte = req_body['clipPGTE']
  n = min(req_body['noOfResults'], 500)
  si = req_body['startIndex']
  rows = df[
    (df['pose_prediction'] >= p_gte) &
    (df['pose_prediction'] <= p_lte) &
    (df['clip_prediction'] >= c_gte) &
    (df['clip_prediction'] <= c_lte)
  ].values.tolist()
  res_body = {
    "headers": headers,
    "rows": rows[si:si+n]
  }
  return simplejson.dumps(res_body, ignore_nan=True)

@app.route('/search', methods=['POST'])
def search():
  req_body = request.get_json(force=True)
  return searchHandler(req_body)

@app.route("/images/<image_name>")
def images(image_name):
  return send_from_directory(img_dir, image_name)

@app.route('/health')
def health():
  return "OK"