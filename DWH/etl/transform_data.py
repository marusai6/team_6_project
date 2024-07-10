import pandas as pd
import configparser
from sqlalchemy import create_engine

config = configparser.ConfigParser()
config.read('config.ini')

target_host = config['target_database']['host']
target_port = config['target_database']['port']
target_database = config['target_database']['database']
target_user = config['target_database']['user']
target_password = config['target_database']['password']

conn_str = f"postgresql://{target_user}:{target_password}@{target_host}:{target_port}/{target_database}"

engine = create_engine(conn_str)

def clean_data(df, table_name):
    broken_data = pd.DataFrame()

    if table_name == 'базы_данных':
        broken_data = df[df['дата_изм'] >= '2123-07-20']
        df = df[df['дата_изм'] < '2123-07-20']

    elif table_name == 'базы_данных_и_уровень_знаний_сотрудников':
        broken_data = df[df['уровень_знаний_id'].isna() | df['дата'].isna()]
        df.drop(columns=['название'], inplace=True)
        df.dropna(subset=['уровень_знаний_id', 'дата'], inplace=True)
        df = df[['база_данных_id', 'уровень_знаний_id', 'дата_изм', 'дата', 'активность', 'сорт']]

    elif table_name == 'инструменты_и_уровень_знаний_сотрудников':
        broken_data = df[df['уровень_знаний_id'].isna() | df['дата'].isna() | (df['дата_изм'] <= df['дата'])]
        df.drop(columns=['название'], inplace=True)
        df.dropna(subset=['уровень_знаний_id', 'дата'], inplace=True)
        df = df[df['дата_изм'] > df['дата']]
        df = df[['инструменты_id', 'уровень_знаний_id', 'дата_изм', 'дата', 'активность', 'сорт']]

    elif table_name == 'образование_пользователей':
        df['уровень_образования'] = df['уровень_образования'].str.replace('образованиЕ', 'образованиЯ')
        broken_data = df[(df['год_окончания'] > 2024) | (df['год_окончания'] == 1960) | (df['год_окончания'].isna()) | (
            df['уровень_образования'].isna())]
        df = df[df['год_окончания'] <= 2024]
        df = df[df['год_окончания'] != 1960]
        df.drop(columns=['название_учебного_заведения'], inplace=True)
        df.dropna(subset=['уровень_образования', 'год_окончания'], inplace=True)
        df['квалификация'], df['специальность'] = df['специальность'], df['квалификация']

    elif table_name == 'опыт_сотрудника_в_отраслях':
        broken_data = df[df['дата'].isna() | df['уровень_знаний_в_отрасли_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['дата', 'уровень_знаний_в_отрасли_id'], inplace=True)

    elif table_name == 'опыт_сотрудника_в_предметных_областях':
        broken_data = df[df['дата'].isna() | df['уровень_знаний_в_предметной_области_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['дата', 'уровень_знаний_в_предметной_области_id'], inplace=True)

    elif table_name == 'платформы_и_уровень_знаний_сотрудников':
        broken_data = df[df['дата'].isna() | df['уровень_знаний_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['дата', 'уровень_знаний_id'], inplace=True)

    elif table_name == 'резюмедар':
        df = df[['user_id', 'активность', 'образование_id', 'сертификаты_курсы_id', 'языки_id', 'базы_данных_id',
                 'инструменты_id', 'отрасли_id', 'платформы_id', 'предметные_области_id', 'среда_разработки_id',
                 'типы_систем_id', 'фреймворки_id', 'языки_программирования_id', 'технологии_id']]
        broken_data = df[df.isna().any(axis=1)]
        df.dropna(inplace=True)

    elif table_name == 'сертификаты_пользователей':
        broken_data = df[df['организация_выдавшая_сертификат'].isna() | df['год_сертификата'].isna()]
        df.dropna(subset=['организация_выдавшая_сертификат', 'год_сертификата'], inplace=True)

    elif table_name == 'сотрудники_дар':
        broken_data = df[
            df['фамилия'].isna() | df['имя'].isna() | df['последняя_авторизация'].isna() | df['должность'].isna()]
        df.dropna(subset=['фамилия', 'имя', 'последняя_авторизация', 'должность'], inplace=True)
        df.replace('-', pd.NA, inplace=True)

    elif table_name == 'среды_разработки_и_уровень_знаний_сотрудников':
        broken_data = df[df['дата'].isna() | df['уровень_знаний_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['дата', 'уровень_знаний_id'], inplace=True)

    elif table_name == 'технологии_и_уровень_знаний_сотрудников':
        broken_data = df[df['уровень_знаний_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['уровень_знаний_id'], inplace=True)

    elif table_name == 'типы_систем_и_уровень_знаний_сотрудников':
        broken_data = df[df['дата'].isna() | df['уровень_знаний_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['дата', 'уровень_знаний_id'], inplace=True)

    elif table_name == 'уровень_образования':
        broken_data = df[df['id'] == 262859]
        df = df[df['id'] != 262859]

    elif table_name == 'фреймворки_и_уровень_знаний_сотрудников':
        broken_data = df[df['дата'].isna() | df['уровень_знаний_id'].isna() | df['фреймворки_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['дата', 'уровень_знаний_id', 'фреймворки_id'], inplace=True)

    elif table_name == 'языки_пользователей':
        broken_data = df[df['уровень_знаний_иностранного_языка_id'].isna()]
        df.drop(columns=['название'], inplace=True)
        df.dropna(subset=['уровень_знаний_иностранного_языка_id'], inplace=True)

    elif table_name == 'языки_программирования_и_уровень_знаний':
        broken_data = df[df['уровень_знаний_id'].isna()]
        df.drop(columns=['название', 'уровень_знаний'], inplace=True)
        df.dropna(subset=['уровень_знаний_id'], inplace=True)

    return df, broken_data


def load_and_clean_table(table_name):
    query = f"SELECT * FROM ods.{table_name}"
    df = pd.read_sql(query, engine)

    df_cleaned, df_broken = clean_data(df, table_name)

    df_cleaned.to_sql(table_name, engine, schema='dds', if_exists='replace', index=False)

    if not df_broken.empty:
        broken_table_name = f"{table_name}_broken"
        df_broken.to_sql(broken_table_name, engine, schema='dds', if_exists='replace', index=False)

    print(f"Table {table_name} cleaned and loaded successfully.")
    if not df_broken.empty:
        print(f"Broken data from {table_name} loaded into {broken_table_name}.")


tables = [
    'базы_данных',
    'базы_данных_и_уровень_знаний_сотрудников',
    'инструменты_и_уровень_знаний_сотрудников',
    'образование_пользователей',
    'отрасли',
    'опыт_сотрудника_в_отраслях',
    'опыт_сотрудника_в_предметных_областях',
    'платформы_и_уровень_знаний_сотрудников',
    'резюмедар',
    'сертификаты_пользователей',
    'сотрудники_дар',
    'среды_разработки_и_уровень_знаний_сотрудников',
    'типы_систем_и_уровень_знаний_сотрудников',
    'технологии_и_уровень_знаний_сотрудников',
    'уровень_образования',
    'фреймворки_и_уровень_знаний_сотрудников',
    'языки_пользователей',
    'языки_программирования_и_уровень_знаний'
]

for table in tables:
    load_and_clean_table(table)

print("All tables processed and loaded into DDS successfully.")
