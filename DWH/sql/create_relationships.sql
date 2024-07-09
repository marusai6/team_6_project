-- Скрипт для создания отношений между таблицами

ALTER TABLE dds.базы_данных_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_база_данных
FOREIGN KEY (база_данных_id) REFERENCES dds.базы_данных(id);

ALTER TABLE dds.базы_данных_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_бд
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.инструменты_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_инструменты
FOREIGN KEY (инструменты_id) REFERENCES dds.инструменты(id);

ALTER TABLE dds.инструменты_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_инструменты
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.образование_пользователей
ADD CONSTRAINT fk_образование_пользователи
FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id);

ALTER TABLE dds.опыт_сотрудника_в_отраслях
ADD CONSTRAINT fk_отрасли
FOREIGN KEY (отрасли_id) REFERENCES dds.отрасли(id);

ALTER TABLE dds.опыт_сотрудника_в_отраслях
ADD CONSTRAINT fk_уровень_знаний_в_отрасли
FOREIGN KEY (уровень_знаний_в_отрасли_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.опыт_сотрудника_в_предметных_областях
ADD CONSTRAINT fk_предметная_область
FOREIGN KEY (предметная_область_id) REFERENCES dds.предметная_область(id);

ALTER TABLE dds.опыт_сотрудника_в_предметных_областях
ADD CONSTRAINT fk_уровень_знаний_в_предметной_области
FOREIGN KEY (уровень_знаний_в_предметной_области_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_образование
FOREIGN KEY (образование) REFERENCES dds.образование_пользователей(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_сертификаты_курсы
FOREIGN KEY (сертификаты_курсы) REFERENCES dds.сертификаты_пользователей(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_языки
FOREIGN KEY (языки) REFERENCES dds.языки(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_базы_данных
FOREIGN KEY (базы_данных) REFERENCES dds.базы_данных(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_инструменты
FOREIGN KEY (инструменты) REFERENCES dds.инструменты(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_отрасли
FOREIGN KEY (отрасли) REFERENCES dds.отрасли(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_платформы
FOREIGN KEY (платформы) REFERENCES dds.платформы(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_предметные_области
FOREIGN KEY (предметные_области) REFERENCES dds.предметная_область(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_среда_разработки
FOREIGN KEY (среда_разработки) REFERENCES dds.среды_разработки(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_типы_систем
FOREIGN KEY (типы_систем) REFERENCES dds.типы_систем(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_фреймворки
FOREIGN KEY (фреймворки) REFERENCES dds.фреймворки(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_языки_программирования
FOREIGN KEY (языки_программирования) REFERENCES dds.языки_программирования(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_технологии
FOREIGN KEY (технологии) REFERENCES dds.технологии(id);

ALTER TABLE dds.сертификаты_пользователей
ADD CONSTRAINT fk_сертификаты_пользователи
FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id);

ALTER TABLE dds.среды_разработки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_среды_разработки
FOREIGN KEY (среды_разработки_id) REFERENCES dds.среды_разработки(id);

ALTER TABLE dds.среды_разработки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_среды_разработки
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.типы_систем_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_типы_систем
FOREIGN KEY (типы_систем_id) REFERENCES dds.типы_систем(id);

ALTER TABLE dds.типы_систем_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_типы_систем
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.технологии_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_технологии
FOREIGN KEY (технологии_id) REFERENCES dds.технологии(id);

ALTER TABLE dds.технологии_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_технологии
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.фреймворки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_фреймворки
FOREIGN KEY (фреймворки_id) REFERENCES dds.фреймворки(id);

ALTER TABLE dds.фреймворки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_фреймворки
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.языки_пользователей
ADD CONSTRAINT fk_языки
FOREIGN KEY (язык_id) REFERENCES dds.языки(id);

ALTER TABLE dds.языки_пользователей
ADD CONSTRAINT fk_уровень_знаний_языки
FOREIGN KEY (уровень_знаний_иностранного_языка_id) REFERENCES dds.уровни_владения_ин(id);

ALTER TABLE dds.языки_программирования_и_уровень_знаний
ADD CONSTRAINT fk_языки_программирования
FOREIGN KEY (язык_программирования_id) REFERENCES dds.языки_программирования(id);

ALTER TABLE dds.языки_программирования_и_уровень_знаний
ADD CONSTRAINT fk_уровень_знаний_языки_программирования
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);
