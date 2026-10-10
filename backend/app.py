from flask import Flask, jsonify, request 
from flask_cors import CORS
import sqlite3
app = Flask(__name__)
CORS(app)
def get_db_connection():
    connection = sqlite3.connect('job_tracker.db')
    connection.row_factory = sqlite3.Row
    return connection
def init_db():
    connection = get_db_connection()

    connection.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT NOT NULL,
            position TEXT NOT NULL,
            status TEXT NOT NULL,
            location TEXT NOT NULL
        )
    ''')

    connection.commit()
    connection.close()
@app.route('/')
def home():
    return jsonify({
        'message': 'Job Application Tracker API'
    })

@app.route('/api/jobs')
def get_jobs():
    connection = get_db_connection()
    jobs = connection.execute('SELECT * FROM jobs').fetchall()
    connection.close()

    return jsonify([dict(job) for job in jobs])

@app.route('/api/jobs/<int:job_id>')
def get_job(job_id):
    connection = get_db_connection()
    job = connection.execute(
        'SELECT * FROM jobs WHERE id = ?',
        (job_id,)
    ).fetchone()
    connection.close()

    if job is None:
        return jsonify({'error': 'Job not found'}), 404

    return jsonify(dict(job))

@app.route('/api/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    data = request.get_json()

    connection = get_db_connection()
    existing_job = connection.execute(
    'SELECT * FROM jobs WHERE id = ?',
    (job_id,)
).fetchone()

    if existing_job is None:
         connection.close()
         return jsonify({'error': 'Job not found'}), 404

    connection.execute(
    '''
    UPDATE jobs
    SET company = ?, position = ?, status = ?, location = ?
    WHERE id = ?
    ''',
    (
        data['company'],
        data['position'],
        data['status'],
        data['location'],
        job_id
    )
)
    connection.commit()
    connection.close()

    return jsonify({'message': 'Job updated successfully'}), 200

@app.route('/api/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    connection = get_db_connection()

    job = connection.execute(
        'SELECT * FROM jobs WHERE id = ?',
        (job_id,)
    ).fetchone()

    if job is None:
        connection.close()
        return jsonify({'error': 'Job not found'}), 404

    connection.execute(
        'DELETE FROM jobs WHERE id = ?',
        (job_id,)
    )
    connection.commit()
    connection.close()
    return jsonify({'message': 'Job deleted successfully'}), 200
    
@app.route('/api/jobs', methods=['POST'])
def create_job():
    data = request.get_json()

    connection = get_db_connection()

    connection.execute(
        '''
        INSERT INTO jobs (company, position, status, location)
        VALUES (?, ?, ?, ?)
        ''',
        (
            data['company'],
            data['position'],
            data['status'],
            data['location']
        )
    )

    connection.commit()
    connection.close()

    return jsonify({'message': 'Job created successfully'}), 201

if __name__ == '__main__':
    init_db()
    app.run()