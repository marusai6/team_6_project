# Импорт библиотек
import pandas as pd
import configparser
from sqlalchemy import create_engine

# Подключение к БД через конфигурационный файл
config = configparser.ConfigParser()
config.read('config.ini')

db_host = config['Database']['db_host']
db_port = config['Database']['db_port']
db_name = config['Database']['db_name']
db_user = config['Database']['db_user']
db_password = config['Database']['db_password']

conn_str = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
engine = create_engine(conn_str)

#Загружаем свои таблицы
df_2 = pd.read_csv('period.csv', sep=',', encoding='UTF-8')
df_3 = pd.read_csv('category_know.csv', sep=';', encoding='UTF-8')

df_2.to_sql('period', engine, schema='dm', if_exists='append', index=False)
df_3.to_sql('category_know', engine, schema='dm', if_exists='append', index=False)

df=pd.read_sql('SELECT * FROM dds.сотрудники_дар', engine)
df.to_sql('сотрудники_дар', engine, schema='dm', if_exists='append', index=False)

# Запрос, который объединяет таблицы_справочники по навыкам в одну
df_5=pd.read_sql('''select * from dds.базы_данных
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

df_5.to_sql('knowledge', engine, schema='dm', if_exists='append', index=False)

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
df_6.to_sql('lables', engine, schema='dm', if_exists='append', index=False)

# Запрос, который объединяет таблицы с навыками и уровнями в одну и добавляет колонку period_id, потом
# соединяется с таблицей lables по общему полю
request = '''CREATE temporary table temp_1 (
	record_id INT,
	"User ID" INT,
	date_last DATE,
	know_id INT,
	level_id INT,
	date_first DATE,
	category_know_id INT
);
insert into temp_1 (
select id as record_id, "User ID", "Дата изм." as date_last, "Базы данных" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111121 as "category_know_id" from dds.базы_данных_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "инструменты" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111118 as "category_know_id" from dds.инструменты_и_уровень_знаний_сотр
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "платформы" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111117 as "category_know_id" from dds.платформы_и_уровень_знаний_сотруд
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "Среды разработки" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111119 as "category_know_id" from dds.среды_разработки_и_уровень_знаний_
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "Типы систем" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111122 as "category_know_id" from dds.типы_систем_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "фреймворки" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111123 as "category_know_id" from dds.фреймворки_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "Языки программирования" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111124 as "category_know_id" from dds.языки_программирования_и_уровень
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "технологии" as know_id, "Уровень знаний" as level_id, дата as date_first,
1111120 as "category_know_id" from dds.технологии_и_уровень_знаний_сотру
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "отрасли" as know_id, "Уровень знаний в отрасли" as level_id, дата as date_first,
1111182 as "category_know_id" from dds.опыт_сотрудника_в_отраслях
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "Предметные области" as know_id, "Уровень знаний в предметной облас" as level_id, дата as date_first,
1111183 as "category_know_id" from dds.опыт_сотрудника_в_предметных_обла
UNION ALL
select id as record_id, "User ID", "Дата изм." as date_last, "язык" as know_id, "Уровень знаний ин. языка" as level_id, NULL as date_first,
1111184 as "category_know_id" from dds.языки_пользователей
);

select t1.record_id, t1."User ID", t1.date_last, t1.know_id, t1.level_id, l.n_level, t1.date_first, t1.category_know_id
 from temp_1 t1
JOIN dm.lables l ON t1.level_id=l.id'''

# Далее я не смогла сообразить, как обойтись без дополнительных таблиц, поэтому создала слой temporary_tables
# и пару таблиц в нём
df_4=pd.read_sql(request, engine)
df_4['growth']=1
df_4.to_sql('навыки_и_уровни_знаний', engine, schema='temporary_tables', if_exists='append', index=False)

# Запрос, который выбирает записи из таблиц, которые соответствуют каждому периоду
request='''select * from temporary_tables.навыки_и_уровни_знаний
where date_first >= (select начало_периода from dm.period
						 where id = 1111181)
and date_last <= (select конец_периода from dm.period
						 where id = 1111181);'''

agg_function={'growth':'sum'}

df_7=pd.read_sql(request, engine)
df_7['period_id']=1111181

# Группируем данные, заполняем колонку growth
df_9=df_7.groupby(['User ID', 'category_know_id', 'know_id']).agg(agg_function).reset_index()
for i in range(len(df_7)):
    for j in range(len(df_9)):
        if df_7.loc[i, 'User ID']==df_9.loc[j, 'User ID'] and df_7.loc[i, 'category_know_id']==df_9.loc[j, 'category_know_id'] and df_7.loc[i, 'know_id']==df_9.loc[j, 'know_id']:
            df_7.loc[i, 'growth']=df_9.loc[j, 'growth']
            break

# То же самое в цикле для каждого периода
for i in range(len(df_2)):
    request=f'''select * from temporary_tables.навыки_и_уровни_знаний
where date_first >= (select начало_периода from dm.period
						 where id = {df_2.loc[i, 'id']})
and date_last <= (select конец_периода from dm.period
						 where id = {df_2.loc[i, 'id']});'''
    df_8 = pd.read_sql(request, engine)
    df_8['period_id'] = df_2.loc[i, 'id']
    df_10=df_8.groupby(['User ID', 'category_know_id', 'know_id']).agg(agg_function).reset_index()
    for i in range(len(df_8)):
        for j in range(len(df_10)):
            if df_8.loc[i, 'User ID'] == df_10.loc[j, 'User ID'] and df_8.loc[i, 'category_know_id'] == df_10.loc[
                j, 'category_know_id'] and df_8.loc[i, 'know_id'] == df_10.loc[j, 'know_id']:
                df_8.loc[i, 'growth'] = df_10.loc[j, 'growth']
                break

    df_7=pd.concat([df_7, df_8], axis=0, ignore_index=False)

df_7.to_sql('for_summary_tab', engine, schema='temporary_tables', if_exists='append', index=False)

# Запрос, который оставляет в итоговой таблице только записи с высшим уровнем в каждой группе
request='''select id, record_id, "User ID", date_last, date_first, category_know_id, know_id, level_id, n_level, period_id, growth
from (
    select *,
        row_number() over (partition by period_id, "User ID", category_know_id, know_id order by n_level desc) as num
    from temporary_tables.for_summary_tab
) as s
where num = 1;
'''

df_11=pd.read_sql(request, engine)
df_11.to_sql('summary_tab', engine, schema='dm', if_exists='append', index=False)


print('Успешно!')