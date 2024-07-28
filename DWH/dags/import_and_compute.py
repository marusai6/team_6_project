from airflow import DAG
from airflow.operators.empty import EmptyOperator
from datetime import datetime
from airflow.models import Variable
from airflow.operators.bash import BashOperator


config = Variable.get("time_start", deserialize_json=True)

with DAG(
    'import_and_compute_data',
    default_args={
        'owner': 'me',
        'start_date': datetime(2024, 7, 25),
    },
    schedule_interval='@monthly',
    catchup=False
) as dag:

    start_step = EmptyOperator(task_id="start_step", dag=dag)

    task_1 = BashOperator(
        task_id="import_source_data_to_ods",
        bash_command='C:/Users/Acer/Desktop/Study/Stag/Stag_project/airflow/dags/scripts/extract_data.py',
)

    task_2= BashOperator(
        task_id="prepare_dds",
        bash_command='C:/Users/Acer/Desktop/Study/Stag/Stag_project/airflow/dags/scripts/prepare_dds.py',
)

    task_3 = BashOperator(
        task_id="prepare_dm",
        bash_command='C:/Users/Acer/Desktop/Study/Stag/Stag_project/airflow/dags/scripts/prepare_datamart_test.py',

)

    end_step = EmptyOperator(task_id="end_step", dag=dag)

    start_step >> task_1 >> task_2 >> task_3 >> end_step