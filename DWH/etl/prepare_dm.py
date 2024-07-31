def main():
# Импорт библиотек
    import pandas as pd
    import configparser
    from sqlalchemy import create_engine, MetaData, Table, event

# Подключение к БД через конфигурационный файл
    config = configparser.ConfigParser()
    config.read('/opt/airflow/dags/Scripts/config.ini')

    db_host = config['Database']['db_host']
    db_port = config['Database']['db_port']
    db_name = config['Database']['db_name']
    db_user = config['Database']['db_user']
    db_password = config['Database']['db_password']

    conn_str = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    engine = create_engine(conn_str)

# Процедура очистки таблиц от данных
# def init_search_path(connection, conn_record):
#     cursor = connection.cursor()
#     try:
#         cursor.execute('SET search_path TO dm;')
#     finally:
#         cursor.close()
#
#
# def truncate_tables(table):
#     metadata = MetaData()
#     my_table = Table(table, metadata, autoload_with=engine)
#
#     conn = engine.connect()
#     event.listen(engine, 'connect', init_search_path(conn))
#     truncate_query = my_table.delete()
#     conn.execute('SET search_path TO dm;')
#     conn.execute(truncate_query)
#     conn.close()
#
# tables=['dm.period', 'dm.category_know', 'dm.сотрудники_дар', 'dm.knows', 'dm.levels', 'dm.summary_tab', 'temporary_tables.навыки_и_уровни_знаний', 'temporary_tables.for_summary_tab']
# for table in tables:
#     truncate_tables(table)

#Загружаем свои таблицы
    df_2 = pd.read_csv('/opt/airflow/dags/Scripts/period.csv', sep=',', encoding='UTF-8')
    df_3 = pd.read_csv('/opt/airflow/dags/Scripts/category_know.csv', sep=';', encoding='UTF-8')

    df_2.to_sql('period', engine, schema='dm', if_exists='append', index=False)
    df_3.to_sql('category_know', engine, schema='dm', if_exists='append', index=False)

    df=pd.read_sql('SELECT * FROM dds.сотрудники_дар', engine)
    df.to_sql('сотрудники_дар', engine, schema='dm', if_exists='append', index=False)

# Запрос, который объединяет таблицы_справочники по навыкам в одну
    df_5=pd.read_sql('''
select * from dds.базы_данных
UNION ALL
select * from dds.инструменты
UNION ALL
select * from dds.среды_разработки
UNION ALL
select * from dds.отрасли
UNION ALL
select * from dds.предметная_область
UNION ALL
select * from dds.платформы
UNION ALL
select * from dds.языки_программирования
UNION ALL
select * from dds.технологии
UNION ALL
select * from dds.типы_систем
UNION ALL
select * from dds.фреймворки
UNION ALL
select * from dds.языки''', engine)

    df_5.to_sql('knows', engine, schema='dm', if_exists='append', index=False)

# Запрос, который объединяет таблицы_справочники по уровням знаний в одну
    df_6=pd.read_sql('''SELECT * FROM dds.уровни_знаний_в_отрасли
UNION ALL
SELECT * FROM dds.уровни_знаний_в_предметной_област
UNION ALL
SELECT * FROM dds.уровень_образования
UNION ALL
SELECT * FROM dds.уровни_владения_ин
UNION ALL
SELECT * FROM dds.уровни_знаний''', engine)

# Добавляем колонку n_level
    df_6['n_level']=None
    df_6.loc[df_6['название'] == 'Использовал на проекте', 'n_level'] = 1
    df_6.loc[df_6['название'] == 'Novice', 'n_level'] = 2
    df_6.loc[df_6['название'] == 'Junior', 'n_level'] = 3
    df_6.loc[df_6['название'] == 'Middle', 'n_level'] = 4
    df_6.loc[df_6['название'] == 'Senior', 'n_level'] = 5
    df_6.loc[df_6['название'] == 'Expert', 'n_level'] = 6
    df_6.to_sql('levels', engine, schema='dm', if_exists='append', index=False)

# Запрос, который объединяет таблицы с навыками и уровнями в одну и добавляет колонку period_id, потом
# соединяется с таблицей lables по общему полю
    request = '''CREATE temporary table temp_1 (
	record_id INT,
	"User ID" INT,
	date_first DATE,
	date_last DATE,
	know_id INT,
	level_id INT,
	category_know_id INT
);
insert into temp_1 (
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "Базы данных" as know_id, "Уровень знаний" as level_id,
1111121 as "category_know_id" from dds.базы_данных_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "инструменты" as know_id, "Уровень знаний" as level_id,
1111118 as "category_know_id" from dds.инструменты_и_уровень_знаний_сотр
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "платформы" as know_id, "Уровень знаний" as level_id,
1111117 as "category_know_id" from dds.платформы_и_уровень_знаний_сотруд
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "Среды разработки" as know_id, "Уровень знаний" as level_id,
1111119 as "category_know_id" from dds.среды_разработки_и_уровень_знаний_
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "Типы систем" as know_id, "Уровень знаний" as level_id,
1111122 as "category_know_id" from dds.типы_систем_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "фреймворки" as know_id, "Уровень знаний" as level_id,
1111123 as "category_know_id" from dds.фреймворки_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "Языки программирования" as know_id, "Уровень знаний" as level_id,
1111124 as "category_know_id" from dds.языки_программирования_и_уровень
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "технологии" as know_id, "Уровень знаний" as level_id,
1111120 as "category_know_id" from dds.технологии_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "отрасли" as know_id, "Уровень знаний в отрасли" as level_id,
1111182 as "category_know_id" from dds.опыт_сотрудника_в_отраслях
UNION ALL
select id as record_id, "User ID", дата as date_first, "Дата изм." as date_last, "Предметные области" as know_id, "Уровень знаний в предметной облас" as level_id,
1111183 as "category_know_id" from dds.опыт_сотрудника_в_предметных_обла
UNION ALL
select id as record_id, "User ID", NULL as date_first, "Дата изм." as date_last, "язык" as know_id, "Уровень знаний ин. языка" as level_id,
1111184 as "category_know_id" from dds.языки_пользователей
);

select t1.record_id, t1."User ID", t1.date_last, t1.date_first, t1.know_id, t1.level_id, l.n_level, t1.category_know_id
 from temp_1 t1
JOIN dm.levels l ON t1.level_id=l.id'''

# Далее я не смогла сообразить, как обойтись без дополнительных таблиц, поэтому создала слой temporary_tables
# и пару таблиц в нём
    df_4=pd.read_sql(request, engine)
    df_4.to_sql('навыки_и_уровни_знаний', engine, schema='temporary_tables', if_exists='append', index=False)

    df_7=pd.DataFrame(columns=['record_id', 'User ID', 'date_last', 'date_first', 'category_know_id', 'know_id', 'level_id', 'n_level'])

# Запрос, который выбирает записи из таблиц, которые соответствуют каждому периоду
    for i in range(len(df_2)):
        request=f'''select * from temporary_tables.навыки_и_уровни_знаний
where date_last between (select начало_периода from dm.period
						 where id = {df_2.loc[i, 'id']})
and (select конец_периода from dm.period
						 where id = {df_2.loc[i, 'id']});'''
        df_8 = pd.read_sql(request, engine)
        df_8['period_id'] = df_2.loc[i, 'id']

        df_7=pd.concat([df_7, df_8], axis=0, ignore_index=False)

    df_7.to_sql('for_summary_tab', engine, schema='temporary_tables', if_exists='append', index=False)

# Запрос, который оставляет в итоговой таблице только записи с высшим уровнем в каждой группе
    request='''CREATE temporary table temp_2 (
	record_id INT,
	"User ID" INT,
	date_first DATE,
	date_last DATE,
	category_know_id INT,
	know_id INT,
	level_id INT,
	n_level INT,
	period_id INT,
	growth INT
);
insert into temp_2 (
select record_id, "User ID", date_first, date_last, category_know_id, know_id, level_id, n_level, period_id, growth
from (
    select *,
	count(*) over (partition by period_id, "User ID", category_know_id, know_id) as "growth",
     row_number() over (partition by period_id, "User ID", category_know_id, know_id order by n_level desc) as num
    from temporary_tables.for_summary_tab
) as s
where num = 1);

WITH MaxLevels AS (
    SELECT 
        "User ID", 
        category_know_id, 
        know_id, 
        MAX(n_level) AS max_n_level
    FROM 
        temp_2
    GROUP BY 
        "User ID", 
        category_know_id, 
        know_id
)
SELECT 
    st.*,
    CASE 
        WHEN st.n_level = ml.max_n_level THEN TRUE
		WHEN st.n_level is NULL THEN NULL
        ELSE FALSE
    END AS current_level
FROM 
    temp_2 st
JOIN 
    MaxLevels ml
ON 
    st."User ID" = ml."User ID" AND 
    st.category_know_id = ml.category_know_id AND 
    st.know_id = ml.know_id
UNION ALL
select NULL as record_id, "User ID", NULL as date_first, NULL as date_last, 1111186 as "category_know_id", NULL as know_id, "Уровень образования" as level_id,
 NULL as n_level, NULL as period_id, NULL as growth, NULL as current_level from dds.образование_пользователей;'''

    df_11=pd.read_sql(request, engine)
    df_11.to_sql('summary_tab', engine, schema='dm', if_exists='append', index=False)


    print('Успешно!')

if __name__ == '__main__':
    main()
