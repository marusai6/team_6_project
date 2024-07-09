import pandas as pd
import configparser
from sqlalchemy import create_engine

config = configparser.ConfigParser()
config.read('config.ini')

source_host = config['source_database']['host']
source_port = config['source_database']['port']
source_database = config['source_database']['database']
source_user = config['source_database']['user']
source_password = config['source_database']['password']

target_host = config['target_database']['host']
target_port = config['target_database']['port']
target_database = config['target_database']['database']
target_user = config['target_database']['user']
target_password = config['target_database']['password']

source_conn_str = f"postgresql://{source_user}:{source_password}@{source_host}:{source_port}/{source_database}"
target_conn_str = f"postgresql://{target_user}:{target_password}@{target_host}:{target_port}/{target_database}"

source_engine = create_engine(source_conn_str)
target_engine = create_engine(target_conn_str)

def copy_table(table_name):
    df = pd.read_sql(f'SELECT * FROM source_data.{table_name}', source_engine)
    df.to_sql(table_name, target_engine, schema='ods', if_exists='replace', index=False)
    print(f"Table {table_name} copied successfully")

tables_query = """
SELECT table_name 
FROM information_schema.tables
WHERE table_schema = 'source_data'
"""
tables = pd.read_sql(tables_query, source_engine)

for table in tables['table_name']:
    copy_table(table)

print("All tables copied successfully")

