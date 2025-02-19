from flask import Flask, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Load shipment data safely
CSV_FILE = "shipmentinfo_data.csv"

if os.path.exists(CSV_FILE):
    shipment_df = pd.read_csv(CSV_FILE)
    shipment_df["Date"] = pd.to_datetime(shipment_df["Date"])  # Convert Date column to datetime
else:
    shipment_df = None  # Handle missing file

# Convert DataFrame to JSON
def convert_to_json(df):
    return df.to_dict(orient="records")

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Shipment API", "endpoints": ["/shipments", "/shipments/<year>", "/shipments/country/<country>", "/shipments/type/<shipment_type>"]})

@app.route("/shipments", methods=["GET"])
def get_all_shipments():
    if shipment_df is None:
        return jsonify({"error": "Shipment data not found"}), 404
    return jsonify(convert_to_json(shipment_df))

@app.route("/shipments/<int:year>", methods=["GET"])
def get_shipments_by_year(year):
    if shipment_df is None:
        return jsonify({"error": "Shipment data not found"}), 404
    filtered_df = shipment_df[shipment_df["Date"].dt.year == year]
    if filtered_df.empty:
        return jsonify({"error": f"No shipments found for the year {year}"}), 404
    return jsonify(convert_to_json(filtered_df))

@app.route("/shipments/country/<string:country>", methods=["GET"])
def get_shipments_by_country(country):
    if shipment_df is None:
        return jsonify({"error": "Shipment data not found"}), 404
    filtered_df = shipment_df[shipment_df["Country"].str.lower() == country.lower()]
    if filtered_df.empty:
        return jsonify({"error": f"No shipments found for {country}"}), 404
    return jsonify(convert_to_json(filtered_df))

@app.route("/shipments/type/<string:shipment_type>", methods=["GET"])
def get_shipments_by_type(shipment_type):
    if shipment_df is None:
        return jsonify({"error": "Shipment data not found"}), 404
    filtered_df = shipment_df[shipment_df["Shipment Type"].str.lower() == shipment_type.lower()]
    if filtered_df.empty:
        return jsonify({"error": f"No shipments found for type {shipment_type}"}), 404
    return jsonify(convert_to_json(filtered_df))

if __name__ == "__main__":
    app.run(debug=True)
