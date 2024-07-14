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
        broken_data = df[df['Дата изм.'] >= '2123-07-20']
        df.loc[df['название'] == 'Teradata', 'Дата изм.'] = '21.10.2020 13:17:53'
        df = df[df['Дата изм.'] < '2123-07-20']

    elif table_name == 'базы_данных_и_уровень_знаний_сотру':
        broken_data = df[df['Уровень знаний'].isna() | df['Дата изм.'].isna()]
        df.drop(columns=['название', 'Сорт.'], inplace=True)
        df.dropna(subset=['Уровень знаний', 'Дата изм.'], inplace=True)
        df['Дата изм.'] = df['Дата изм.'].fillna(df['Дата изм.'])
        df = df[['Базы данных', 'Уровень знаний', 'Дата изм.', 'активность']]

    elif table_name == 'инструменты':
        df.drop_duplicates(subset=['id'], keep='first', inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        if 'Сорт.' in df.columns:
            df.drop(columns=['Сорт.'], inplace=True)

    elif table_name == 'образование_пользователей':

        df = df.dropna(subset=['User ID'])
        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df = df[df['User ID'].isin(valid_user_ids)]
        df.drop(columns=['Сорт.', 'Факультет, кафедра', 'специальность', 'квалификация'], inplace=True)
        broken_data = df[(df['Год окончания'] > 2024) | (df['Год окончания'] == 1960) | (df['Год окончания'].isna()) | (
            df['Уровень образование'].isna())]

        # Заполнение пустых и ошибочных значений в столбце 'Год окончания'
        df['Год окончания'] = df['Год окончания'].fillna(1)
        df['Год окончания'] = df['Год окончания'].replace(1960, 1)

        # Преобразование значений столбца 'активность'
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

        # Заполнение значений 2025 в 'Год окончания' значением "1"
        df['Год окончания'] = df['Год окончания'].replace(2025, 1)

        # Заполнение значений 0 в 'Год окончания' значением "1"
        df['Год окончания'] = df['Год окончания'].replace(0, 1)


        # Извлечение ID уровня образования
        df['Уровень образование'] = df['Уровень образование'].str.extract(r'(\d+)').astype(int)

        # Заполнение пустых значений в столбце 'Фиктивное название'
        df['Фиктивное название'].replace("", "Не указано", inplace=True)

        # Перенос вероятно ошибочных данных с исключением ID 558
        broken_data = df[(df['Год окончания'] == 1960) & (df['User ID'] != 558)]



    elif table_name == 'опыт_сотрудника_в_отраслях':
        df = df.drop(columns=['Сорт.'])
        df['отрасли'] = df['отрасли'].str.extract(r'\[(\d+)\]')
        df['отрасли'] = pd.to_numeric(df['отрасли'], errors='coerce')
        df['отрасли'] = df['отрасли'].fillna(0).astype(int)

        df['Уровень знаний в отрасли'] = df['Уровень знаний в отрасли'].str.extract(r'(\d+)')
        df['Уровень знаний в отрасли'] = df['Уровень знаний в отрасли'].fillna(0).astype(int)
        valid_kn = pd.read_sql("SELECT id FROM dds.уровни_знаний_в_отрасли", engine)['id']
        df = df[df['Уровень знаний в отрасли'].isin(valid_kn)]

        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df = df[df['User ID'].isin(valid_user_ids)]

        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']
        df['Уровень знаний в отрасли'] = df['Уровень знаний в отрасли'].replace('', 'Не указано')
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'опыт_сотрудника_в_предметных_обла':

        broken_data = df[df['Дата изм.'].isna() | df['дата'].isna() | df['Уровень знаний в предметной облас'].isna()]

        df['Предментые области'] = df['Предментые области'].str.extract(r'\[(\d+)\]')
        df['Предментые области'] = pd.to_numeric(df['Предментые области'], errors='coerce')
        df['Предментые области'] = df['Предментые области'].fillna(0).astype(int)

        df['Уровень знаний в предметной облас'] = df['Уровень знаний в предметной облас'].str.extract(r'\[(\d+)\]')
        df['Уровень знаний в предметной облас'] = pd.to_numeric(df['Уровень знаний в предметной облас'],
                                                                errors='coerce')
        df = df.dropna(subset=['Уровень знаний в предметной облас'])
        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df = df[df['User ID'].isin(valid_user_ids)]
        valid_kn = pd.read_sql("SELECT id FROM dds.уровни_знаний_в_предметной_област", engine)['id']
        df = df[df['Уровень знаний в предметной облас'].isin(valid_kn)]
        df = df.drop(columns=['Сорт.'])
        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']
        df['дата'] = df['дата'].replace('', None)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'сертификаты_пользователей':
        df.drop(columns=['Сорт.'], inplace=True)
        df = df.dropna(subset=['Год сертификата'])
        df['Год сертификата'] = df['Год сертификата'].astype(str).str.extract(r'(\d{4})', expand=False).fillna(
            '1').astype(int)

        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        df['Организация, выдавшая сертификат'].replace('', 'Не указано', inplace=True)

        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        df = df[df['User ID'].isin(valid_user_ids)]
        df.drop_duplicates(
            subset=['User ID', 'Год сертификата', 'Наименование сертификата', 'Организация, выдавшая сертификат'],
            keep='first', inplace=True)
        df_broken = df[
            (df['User ID'] == 2828) & (df['Год сертификата'] == 2025) & (df['Организация, выдавшая сертификат'] == '')]
        df_clean = df.drop(df_broken.index)

    elif table_name == 'сотрудники_дар':
        df.dropna(subset=['фамилия', 'Дата рождения', 'имя', 'Последняя авторизация', 'должность'], inplace=True)
        df['Последняя авторизация'] = df['Последняя авторизация'].replace('', '1')
        df['должность'] = df['должность'].replace(['', '-'], 'Не указано')
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        df['цфо'] = df['цфо'].replace('', 'Не указано')
        broken_data = df[
            df['фамилия'].isna() | df['имя'].isna() | df['Дата регистрации'].isna() | df['Дата рождения'].isna() | df['Последняя авторизация'].isna() | df['должность'].isna()]

    elif table_name == 'среды_разработки_и_уровень_знаний_':
        # Удаление строк с пустыми значениями в столбцах "Уровень знаний" и "Дата изм."
        broken_data = df[df['Уровень знаний'].isna() | df['Дата изм.'].isna()]
        df.dropna(subset=['Уровень знаний', 'Дата изм.'], inplace=True)

        # Удаление дубликатов
        df.drop_duplicates(subset=['название', 'Среды разработки', 'Уровень знаний'], keep='first', inplace=True)

        # Удаление столбца "Сорт."
        if 'Сорт.' in df.columns:
            df.drop(columns=['Сорт.'], inplace=True)
        # Преобразование столбца "активность"
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        df['User ID'] = df['название'].str.extract(r'User:(\d+)')
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df = df[df['User ID'].isin(valid_user_ids)]
        df['Уровень знаний'] = df['Уровень знаний'].str.extract(r'(\d+)')
        df['Уровень знаний'] = df['Уровень знаний'].fillna(0).astype(int)
        valid_kn = pd.read_sql("SELECT id FROM dds.уровни_знаний", engine)['id']
        df = df[df['Уровень знаний'].isin(valid_kn)]
        df['Среды разработки'] = df['Среды разработки'].str.extract(r'\[(\d+)\]')
        df['Среды разработки'] = df['Среды разработки'].fillna(0).astype(int)

        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']
        df['Уровень знаний'] = df['Уровень знаний'].replace('', 'Не указано')

    elif table_name == 'Уровень знаний':
        broken_data = df[df['Уровень знаний'].isna()]
        df.drop(columns=['название', 'Уровень знаний', 'Сорт.'], inplace=True)
        df.dropna(subset=['Уровень знаний'], inplace=True)

    elif table_name == 'типы_систем_и_уровень_знаний_сотру':
        df.drop(columns=['Сорт.'], inplace=True)
        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df['User ID'] = df['название'].str.extract(r'User:(\d+)')
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        df = df[df['User ID'].isin(valid_user_ids)]
        df['Типы систем'] = df['Типы систем'].str.extract(r'(\d+)', expand=False)

        df['Уровень знаний'] = df['Уровень знаний'].str.extract(r'(\d+)', expand=False)
        df = df.dropna(subset=['Уровень знаний'])
        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']

        df['Уровень знаний'] = df['Уровень знаний'].replace('', None)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        df.drop_duplicates(subset=['название', 'Типы систем', 'Уровень знаний'], keep='first', inplace=True)

    elif table_name == 'уровень_образования':
        broken_data = df[df['id'] == 262859]
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        df = df[df['id'] != 262859]


    elif table_name == 'фреймворки_и_уровень_знаний_сотру':
        df.drop(columns=['Сорт.'], inplace=True)

        df.drop_duplicates(subset=['название', 'Уровень знаний', 'фреймворки'], keep='first', inplace=True)

        # Заполнение пустых значений в столбце "дата" значениями из столбца "Дата изм."
        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']

        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df['User ID'] = df['название'].str.extract(r'User:(\d+)')
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        df = df[df['User ID'].isin(valid_user_ids)]

        # Преобразование столбца "активность"
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

        # Оставить только ID в столбце "Уровень знаний"
        df['Уровень знаний'] = df['Уровень знаний'].str.extract(r'(\d+)', expand=False)

        # Оставить только ID в столбце "фреймворки"
        df['фреймворки'] = df['фреймворки'].str.extract(r'(\d+)', expand=False)
        df['фреймворки'] = df['фреймворки'].fillna(0).astype(int)

        valid_fr = pd.read_sql("SELECT id FROM dds.фреймворки", engine)['id']
        df = df[df['фреймворки'].isin(valid_fr)]

        # Удаление дубликатов
        df.drop_duplicates(subset=['название', 'Уровень знаний', 'фреймворки'], keep='first', inplace=True)

        # Обнаружение строк с пустыми значениями в столбце "фреймворки" и перенос их в отдельную таблицу
        broken_data = df[df['фреймворки'] == 0]
        df = df[df['фреймворки'] != 0]

    elif table_name == 'языки_пользователей':
        df['язык'] = df['язык'].str.extract(r'\[(\d+)\]')
        df['язык'] = pd.to_numeric(df['язык'], errors='coerce')
        df['язык'] = df['язык'].fillna(0).astype(int)

        df['Уровень знаний ин. языка'] = df['Уровень знаний ин. языка'].str.extract(r'\[(\d+)\]')
        df['Уровень знаний ин. языка'] = pd.to_numeric(df['Уровень знаний ин. языка'], errors='coerce')
        df = df.dropna(subset=['Уровень знаний ин. языка'])

        df['user_id'] = df['название'].str.extract(r'User:(\d+)')
        df['user_id'] = pd.to_numeric(df['user_id'], errors='coerce')
        df = df.dropna(subset=['user_id'])

        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df = df[df['user_id'].isin(valid_user_ids)]
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'языки_программирования_и_уровень':
        df.drop(columns=['Сорт.'], inplace=True)
        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']

        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df['User ID'] = df['название'].str.extract(r'User:(\d+)')
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        df = df[df['User ID'].isin(valid_user_ids)]

        # Преобразование столбца "активность"
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

        # Оставить только ID в столбце "Уровень знаний"
        df['Уровень знаний'] = df['Уровень знаний'].str.extract(r'(\d+)', expand=False)

        # Оставить только ID в столбце "фреймворки"
        df['Языки программирования'] = df['Языки программирования'].str.extract(r'(\d+)', expand=False)
        df['Языки программирования'] = df['Языки программирования'].fillna(0).astype(int)

        valid_fr = pd.read_sql("SELECT id FROM dds.языки_программирования", engine)['id']
        df = df[df['Языки программирования'].isin(valid_fr)]

        # Удаление дубликатов
        df_duplicates = df[df.duplicated(subset=['название', 'Уровень знаний', 'Языки программирования'], keep=False)]
        df_not_other = df_duplicates[df_duplicates['Языки программирования'] != 'Другое']
        df.drop(df_not_other.index, inplace=True)

    elif table_name == 'инструменты_и_уровень_знаний_сотр':
        df.drop(columns=['Сорт.'], inplace=True)
        df['дата'] = df['дата'].fillna(df['Дата изм.'])
        df.loc[df['дата'] == '', 'дата'] = df['Дата изм.']

        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df['User ID'] = df['название'].str.extract(r'User:(\d+)')
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        df = df[df['User ID'].isin(valid_user_ids)]

        # Преобразование столбца "активность"
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

        # Оставить только ID в столбце "Уровень знаний"
        df['Уровень знаний'] = df['Уровень знаний'].str.extract(r'(\d+)', expand=False)

        # Оставить только ID в столбце "фреймворки"
        df['инструменты'] = df['инструменты'].str.extract(r'(\d+)', expand=False)
        df['инструменты'] = df['инструменты'].fillna(0).astype(int)

        valid_fr = pd.read_sql("SELECT id FROM dds.инструменты", engine)['id']
        df = df[df['инструменты'].isin(valid_fr)]

        # Удаление дубликатов
        df_duplicates = df[df.duplicated(subset=['название', 'Уровень знаний', 'инструменты'], keep=False)]
        df_not_other = df_duplicates[df_duplicates['инструменты'] != 'Другое']
        df.drop(df_not_other.index, inplace=True)

    elif table_name == 'технологии_и_уровень_знаний_сотру':
        if 'Сорт.' in df.columns:
            df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)
        df.drop_duplicates(subset=['название', 'технологии', 'Уровень знаний'], keep='first', inplace=True)

        df['Уровень знаний'].fillna('Не указано', inplace=True)
        df['Уровень знаний'].replace('', 'Не указано', inplace=True)
        df['User ID'] = df['название'].str.extract(r'User:(\d+)')
        df['User ID'] = pd.to_numeric(df['User ID'], errors='coerce')
        df = df.dropna(subset=['User ID'])
        valid_user_ids = pd.read_sql("SELECT id FROM dds.сотрудники_дар", engine)['id']
        df = df[df['User ID'].isin(valid_user_ids)]
        df['технологии'] = df['технологии'].str.extract(r'(\d+)', expand=False)

        df['Уровень знаний'] = df['Уровень знаний'].str.extract(r'(\d+)', expand=False)


    elif table_name == 'языки':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'уровни_владения_ин':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'среды_разработки':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'фреймворки':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'платформы':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'отрасли':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'технологии':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'типы_систем':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'уровни_знаний':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'языки_программирования':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'уровни_знаний_в_отрасли':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'уровни_знаний_в_предметной_област':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)

    elif table_name == 'предметная_область':
        df.drop(columns=['Сорт.'], inplace=True)
        df['активность'] = df['активность'].apply(lambda x: True if x == 'Да' else False if x == 'Нет' else None)


    return df, broken_data



def load_and_clean_table(table_name):
    query = f"SELECT * FROM ods.{table_name}"
    df = pd.read_sql(query, engine)

    df_cleaned, df_broken = clean_data(df, table_name)

    df_cleaned.to_sql(table_name, engine, schema='dds', if_exists='append', index=False)

    if not df_broken.empty:
        broken_table_name = f"{table_name}_broken"
        df_broken.to_sql(broken_table_name, engine, schema='dds', if_exists='replace', index=False)

    print(f"Table {table_name} cleaned and loaded successfully.")
    if not df_broken.empty:
        print(f"Broken data from {table_name} loaded into {broken_table_name}.")

tables = [
    'опыт_сотрудника_в_отраслях',
]

for table in tables:
    load_and_clean_table(table)

print("All tables processed and loaded into DDS successfully.")
