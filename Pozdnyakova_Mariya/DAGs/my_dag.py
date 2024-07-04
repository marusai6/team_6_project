from airflow import DAG
from airflow.operators.empty import EmptyOperator
from datetime import datetime
from airflow.providers.postgres.operators.postgres import SQLExecuteQueryOperator
from airflow.models import Variable

config = Variable.get("hello", deserialize_json=True)

dag = DAG(
    'reading_dag',
    description='Postgres DAG',
    schedule_interval=config['time_start'],
    start_date=datetime(2021, 11, 7),
    catchup=False
)

start_step = EmptyOperator(task_id="start_step", dag=dag)

hello_step = SQLExecuteQueryOperator(
    task_id="select_step",
    sql="SELECT * FROM source_data.инструменты",
    conn_id='Korus_airflow',
    database='source',
    dag=dag
)

end_step = EmptyOperator(task_id="end_step", dag=dag)

start_step >> hello_step >> end_step
