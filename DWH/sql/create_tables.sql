CREATE TABLE dss.базы_данных (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.инструменты (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.среды_разработки (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.платформы (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.уровни_знаний (
    id INT PRIMARY KEY,
    название VARCHAR(20),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.отрасли (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.предметная_область (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.уровень_образования (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.образование_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    уровень_образования INT,
    основное_название VARCHAR(50),
    направление VARCHAR(50),
    год_окончания INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (уровень_образования) REFERENCES dds.уровень_образования(id)
);


CREATE TABLE dds.базы_данных_и_уровни_знаний (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    база_данных INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (база_данных) REFERENCES dds.базы_данных(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.инструменты_и_уровень_знаний (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    инструмент INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (инструмент) REFERENCES dds.инструменты(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.среды_разработки_и_уровень_знаний (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    среда_разработки INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (среда_разработки) REFERENCES dds.среды_разработки(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.языки_программирования (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.технологии (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.опыт_сотрудника_в_отраслях (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    отрасль INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (отрасль) REFERENCES dds.отрасли(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.опыт_сотрудника_в_предметных_областях (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    область INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (область) REFERENCES dds.предметная_область(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.сотрудники_даp (
    id INT PRIMARY KEY,
    дата_рождения DATE,
    активность BOOLEAN,
    пол VARCHAR(5),
    фамилия VARCHAR(20),
    имя VARCHAR(20),
    последняя_авторизация DATE,
    должность VARCHAR(50),
    цфо VARCHAR(10),
    дата_регистрации DATE,
    "Дата изм." DATE,
    подразделение VARCHAR(50),
    email VARCHAR(50),
    логин VARCHAR(50),
    компания VARCHAR(50),
    город_проживания VARCHAR(50)
);

CREATE TABLE dds.сертификаты_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    наименование_сертификата VARCHAR(100),
    организация_выдавшая_сертификат VARCHAR(50),
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id)
);

CREATE TABLE dds.языки_пользователей (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    язык INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (язык) REFERENCES dds.языки(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_владения_ин(id)
);

CREATE TABLE dds.уровни_знаний_в_предметной_обла
(
    название VARCHAR(50),
    id         INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм."   DATE
);

CREATE TABLE dds.уровни_знаний_в_отрасли
(
    название VARCHAR(50),
    id         INT PRIMARY KEY,
    активность BOOLEAN,
    "Дата изм."   DATE
);

CREATE TABLE dds.уровни_владения_ин (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.языки (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.типы_систем (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.типы_систем_и_уровни_знаний (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    тип_системы INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (тип_системы) REFERENCES dds.типы_систем(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.технологии_и_уровни_знаний_сотрудникв (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    технология INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (технология) REFERENCES dds.технологии(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.фреймворки (
    id INT PRIMARY KEY,
    название VARCHAR(50),
    активность BOOLEAN,
    "Дата изм." DATE
);

CREATE TABLE dds.фреймворки_и_уровни_знаний_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    фреймворк INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (фреймворк) REFERENCES dds.фреймворки(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.среды_и_уровни_знаний_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    среда INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (среда) REFERENCES dds.среды_разработки(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.языки_программирования_и_уровень_знаний (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    язык INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (язык) REFERENCES dds.языки(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.платформы_и_уровень_знаний_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    платформа INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (платформа) REFERENCES dds.платформы(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.технологии_и_уровни_сотрудников (
    id INT PRIMARY KEY,
    "User ID" INT,
    активность BOOLEAN,
    "Дата изм." DATE,
    технология INT,
    уровень_знаний INT,
    FOREIGN KEY ("User ID") REFERENCES dds.сотрудники_даp(id),
    FOREIGN KEY (технология) REFERENCES dds.технологии(id),
    FOREIGN KEY (уровень_знаний) REFERENCES dds.уровни_знаний(id)
);
