from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

# Database configuration
db_host = 'localhost'
db_user = 'postgres'
db_password = '123456'
db_name = 'BestBuy'

# Connect to the database
connection = psycopg2.connect(host=db_host, user=db_user, password=db_password, database=db_name)

@app.route('/api')
def home():
    # Execute SQL query
    cursor = connection.cursor()
    print(cursor)
    cursor.execute("SELECT * FROM tv_bestbuy")

    # Process the data
    data = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    # Pass the data to the template and render it
    return jsonify(data)
#render_template('index.html', data=data)

if __name__ == '__main__':
    app.run()


