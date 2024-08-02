def main():
    import pandas as pd
    import configparser
    from sqlalchemy import create_engine

    config = configparser.ConfigParser()
    config.read('/opt/airflow/dags/Scripts/config.ini')

    source_host = config['source_database']['db_host']
    source_port = config['source_database']['db_port']
    source_database = config['source_database']['db_name']
    source_user = config['source_database']['db_user']
    source_password = config['source_database']['db_password']

    db_host = config['Database']['db_host']
    db_port = config['Database']['db_port']
    db_name = config['Database']['db_name']
    db_user = config['Database']['db_user']
    db_password = config['Database']['db_password']

    source_conn_str = f"postgresql://{source_user}:{source_password}@{source_host}:{source_port}/{source_database}"
    target_conn_str = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

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

if __name__ == '__main__':
    main()
