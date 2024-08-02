from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.empty import EmptyOperator
from datetime import datetime
import Scripts.prepare_dm
import Scripts.extract_data
import Scripts.transform_data


with DAG(
    'import_and_compute_2',
    default_args={
        'owner': 'me',
        'start_date': datetime(2024, 7, 25),

    },
    schedule_interval='@monthly',
) as dag:
    start_step = EmptyOperator(task_id="start_step", dag=dag)

    import_source_data_to_ods = PythonOperator(
        task_id='import_source_data',
        python_callable=Scripts.extract_data.main,
    )

    prepare_dds = PythonOperator(
        task_id='prepare_dds',
        python_callable=Scripts.transform_data.main,
    )

    prepare_dm = PythonOperator(
        task_id='prepare_dm',
        python_callable=Scripts.prepare_dm.main,
    )

    end_step = EmptyOperator(task_id="end_step", dag=dag)

    start_step >> import_source_data_to_ods >> prepare_dds >> prepare_dm >> end_step
